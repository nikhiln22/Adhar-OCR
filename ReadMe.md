# Aadhar OCR System

Aadhar OCR System is a full-stack application that allows users to upload images and extract text in real-time using Optical Character Recognition (OCR). The project provides a fast, user-friendly frontend and a robust backend capable of handling image processing efficiently.

## Live Demo
- **Access the live Demo of Project on:** [https://adhar-ocr.vercel.app/]


## Features

### User-Side Features
- Upload images (PNG, JPEG, JPG) and extract text instantly.
- Responsive, interactive interface built with React + Vite.
- Copy or save extracted text easily.
- Simple and fast user experience.

### Backend Features
- Processes images using OCR libraries (e.g., Tesseract.js).
- REST API endpoints for frontend communication.
- Optional storage of extracted text in MongoDB Atlas.
- Handles multiple simultaneous requests efficiently.
- CORS-enabled for secure frontend-backend communication.

---

## Technologies Used

**Frontend:**
- React.js
- Vite
- TailwindCSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- Tesseract.js (OCR library)
- Multer (for file uploads)
- CORS

---

## Prerequisites

Before starting, ensure you have:  
- Node.js >= 14.0.0  
- npm >= 6.0.0  
- MongoDB Atlas account (for cloud database, optional)

---

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/nikhiln22/Adhar-OCR
cd Adhar-OCR