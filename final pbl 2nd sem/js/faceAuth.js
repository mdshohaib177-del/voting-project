const MODEL_URL = "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights";
let faceModelsLoaded = false;
window.faceCaptureDescriptor = null;
window.faceVerifiedUserId = null;
window.faceVerifiedUserUsn = null;
let activeVideo = null;
let currentStream = null;

async function loadFaceModels() {
    if (faceModelsLoaded) return;

    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

    faceModelsLoaded = true;
}

async function startCamera(videoElementId) {
    const video = document.getElementById(videoElementId);
    if (!video) return null;

    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        const statusId = videoElementId === "signupVideo" ? "faceCaptureStatus" : "faceLoginStatus";
        const status = document.getElementById(statusId);
        if (status) {
            status.innerText = "Your browser does not support camera access.";
        }
        return null;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        currentStream = stream;
        activeVideo = video;
        await video.play();
        return video;
    } catch (error) {
        console.error("Camera error:", error);
        const statusId = videoElementId === "signupVideo" ? "faceCaptureStatus" : "faceLoginStatus";
        const status = document.getElementById(statusId);
        if (status) {
            status.innerText = `Cannot access camera (${error.name}). Allow permission and click Start Camera.`;
        }
        return null;
    }
}

async function ensureCameraStarted(videoElementId) {
    const video = document.getElementById(videoElementId);
    if (!video) return null;

    const activeStream = video.srcObject;
    const activeTrack = activeStream && activeStream.getVideoTracks && activeStream.getVideoTracks()[0];
    if (activeTrack && activeTrack.readyState === "live") {
        return video;
    }

    return await startCamera(videoElementId);
}

async function startSignupCamera() {
    const video = await startCamera("signupVideo");
    const status = document.getElementById("faceCaptureStatus");
    if (video && status) {
        status.innerText = "Camera started. Position your face and click Capture Face.";
    }
}

async function startLoginCamera() {
    const video = await startCamera("loginVideo");
    const status = document.getElementById("faceLoginStatus");
    if (video && status) {
        status.innerText = "Camera started. Enter USN and click Verify Face.";
    }
}

async function initFaceAuth() {
    loadFaceModels().catch(error => {
        console.error("Face model loading failed:", error);
    });
}

async function captureFaceEncodingFromVideo(videoElement) {
    if (!faceModelsLoaded) {
        await loadFaceModels();
    }

    try {
        const detection = await faceapi
            .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

        return detection;
    } catch (error) {
        console.error("Face detection error:", error);
        return null;
    }
}

async function captureAndStoreFace() {
    const status = document.getElementById("faceCaptureStatus");
    const video = await ensureCameraStarted("signupVideo");

    if (!video) {
        alert("Signup camera not available. Grant camera permission and click Start Camera.");
        return;
    }

    const detection = await captureFaceEncodingFromVideo(video);
    if (!detection) {
        alert("No face detected. Please position your face clearly in front of the camera.");
        if (status) status.innerText = "No face detected. Try again.";
        return;
    }

    window.faceCaptureDescriptor = Array.from(detection.descriptor);

    if (status) {
        status.innerText = "Face captured successfully. You can now register.";
    }
}

async function verifyFace() {
    const usn = document.getElementById("loginUsn").value.trim();
    const status = document.getElementById("faceLoginStatus");
    const video = await ensureCameraStarted("loginVideo");

    if (!usn) {
        alert("Enter USN before verifying your face.");
        return;
    }

    if (!video) {
        alert("Login camera not available. Grant camera permission and click Start Camera.");
        return;
    }

    const detection = await captureFaceEncodingFromVideo(video);
    if (!detection) {
        alert("No face detected. Please position your face clearly in front of the camera.");
        if (status) status.innerText = "No face detected. Try again.";
        return;
    }

    const { data, error } = await db
        .from("user")
        .select("*")
        .eq("usn", usn)
        .single();

    if (error || !data) {
        console.error(error);
        alert("User not found. Check USN and try again.");
        if (status) status.innerText = "User not found.";
        return;
    }

    if (!data.face_encoding || data.face_encoding === "pending") {
        alert("No face data stored for this user. Please register first.");
        if (status) status.innerText = "Face data missing for this user.";
        return;
    }

    const storedDescriptor = data.face_encoding.split(",").map(Number);
    const distance = faceapi.euclideanDistance(detection.descriptor, storedDescriptor);

    const threshold = 0.5;
    if (distance <= threshold) {
        window.faceVerifiedUserId = data.id;
        window.faceVerifiedUserUsn = usn;
        alert("Face verified successfully.");
        if (status) status.innerText = "Face verified. You may now login.";
    } else {
        window.faceVerifiedUserId = null;
        window.faceVerifiedUserUsn = null;
        alert("Face did not match. Please try again.");
        if (status) status.innerText = "Face not verified. Try again.";
    }
}

window.addEventListener("DOMContentLoaded", initFaceAuth);