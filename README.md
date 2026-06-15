# 🗳️ Biometric Face Verified Voting System

A secure electronic voting system that uses **facial recognition** to authenticate voters and prevent duplicate voting.

## 📌 Features

- Face-based voter authentication
- Secure voter registration
- One person, one vote
- Duplicate vote prevention
- Real-time vote storage using Supabase
- Admin-only result access
- Automatic vote counting
- Winner calculation

## 🛠️ Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend & Database
- Supabase

### Face Recognition
- Face-API.js
- Webcam API

## 📂 Project Structure

```text
VOTING PBL
│
├── assets/
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── faceAuth.js
│   ├── voting.js
│   ├── results.js
│   └── supabase.js
│
├── models/
│   ├── tiny_face_detector_model-shard1
│   ├── tiny_face_detector_model-weights_manifest.json
│   ├── face_landmark_68_model-shard1
│   ├── face_landmark_68_model-weights_manifest.json
│   ├── face_recognition_model-shard1
│   ├── face_recognition_model-shard2
│   └── face_recognition_model-weights_manifest.json
│
├── index.html
├── signup.html
├── login.html
├── voting.html
├── results.html
└── admin.html
```

## 🚀 Workflow

```text
Register
   ↓
Capture Face
   ↓
Store Face Encoding
   ↓
Login
   ↓
Face Verification
   ↓
Vote
   ↓
Vote Stored in Database
   ↓
Admin Views Results
```

## 🗄️ Database Tables

### user

| Column | Type |
|----------|----------|
| id | int |
| name | text |
| usn | text |
| face_encoding | text |
| has_voted | boolean |

### votes

| Column | Type |
|----------|----------|
| id | int |
| user_id | int |
| candidate | text |
| created_at | timestamp |

## 🔒 Security Features

- Facial biometric authentication
- Duplicate vote prevention
- Admin-only result access
- Secure cloud database storage

## 👨‍💻 Team Members

### Mohammed Shohaib A
- Team Lead
- Voting Logic & System Integration

### Sri Sai P B
- Backend & Database Developer

### Shreyas N Pawar
- Face Recognition Developer

### Bibi Sakeena
- Frontend UI Designer

### Keerthi Arani
- Frontend UI Designer & Responsive Design

## 📸 Screenshots
<img width="1919" height="936" alt="Screenshot 2026-06-15 225014" src="https://github.com/user-attachments/assets/8b792390-a1eb-4d46-9b4b-3e67ac9ae8c4" />
<img width="1919" height="942" alt="Screenshot 2026-06-15 224953" src="https://github.com/user-attachments/assets/6abd3a23-5218-4bf8-9065-9bc4006d2c9c" />
<img width="1919" height="940" alt="Screenshot 2026-06-15 224914" src="https://github.com/user-attachments/assets/ee74c748-02f3-4b25-91cf-4ec073f94513" />
<img width="1919" height="942" alt="Screenshot 2026-06-15 224901" src="https://github.com/user-attachments/assets/4f833a88-365f-4c54-8818-f2c9ec266100" />
<img width="832" height="708" alt="Screenshot 2026-06-15 223543" src="https://github.com/user-attachments/assets/3d26a1d4-1b02-4b7c-81bc-9db7bd5c4f87" />
<img width="916" height="706" alt="Screenshot 2026-06-15 223139" src="https://github.com/user-attachments/assets/e9cee8c0-00b5-4281-97d4-88075b3c7d7c" />
<img width="1919" height="933" alt="Screenshot 2026-06-15 220643" src="https://github.com/user-attachments/assets/899c1a35-db42-448e-98d2-625333204a1e" />


Add screenshots of:
- Home Page
- Registration Page
- Login Page
- Voting Page
- Results Dashboard

## 📜 License

This project is developed for academic and educational purposes.
