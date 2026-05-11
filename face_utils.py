import cv2
import face_recognition

def capture_and_encode():

    # Use working camera index
    cam = cv2.VideoCapture(0)

    # Check camera access
    if not cam.isOpened():
        print("Camera not accessible ❌")
        return None

    print("Press ENTER to capture face")

    frame = None

    while True:
        ret, frame = cam.read()

        if not ret:
            print("Failed to grab frame ❌")
            break

        # Mirror view
        frame = cv2.flip(frame, 1)

        # Show camera feed
        cv2.imshow("Face Recognition Camera", frame)

        key = cv2.waitKey(1)

        # ENTER key to capture
        if key == 13:
            break

    # Release camera
    cam.release()
    cv2.destroyAllWindows()

    # Check frame
    if frame is None:
        print("No frame captured ❌")
        return None

    # Convert image BGR → RGB
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Detect face locations
    face_locations = face_recognition.face_locations(rgb)

    if len(face_locations) == 0:
        print("No face detected ❌")
        return None

    print(f"Face detected: {len(face_locations)}")

    # Generate face encodings
    encodings = face_recognition.face_encodings(rgb, face_locations)

    if len(encodings) == 0:
        print("Encoding failed ❌")
        return None

    print("Encoding generated ✅")

    # Print encoding vector
    print(encodings[0])

    return encodings[0]


if __name__ == "__main__":
    capture_and_encode()