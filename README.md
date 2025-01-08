# **User Authentication Application**

This project is a full-stack user authentication system built with **Next.js** (frontend) and **Node.js** (backend), featuring login with OTP, user registration with image upload, and account deletion.

---

## **Project Structure**

```
user-auth-app/
│
├── frontend/        # Next.js-based frontend
│   ├── pages/       # Login, Registration, Thank You, and Error pages
│   └── components/  # Reusable UI components
│
├── backend/         # Node.js backend
│   ├── server.js    # Main server file
│   ├── routes/      # API routes for authentication
│   └── config/      # Database and environment configuration
└── README.md        # Project documentation
```

---

## **Features**

1. **Frontend**:
   - User-friendly forms for login and registration.
   - OTP-based authentication.
   - Personalized welcome page after successful login.
   - Error handling and notifications.

2. **Backend**:
   - Secure API endpoints using JSON Web Tokens (JWT).
   - OTP generation and validation.
   - User data storage with SQLite or MongoDB.
   - File upload support using `multer`.

3. **Deployment**:
   - Frontend on Vercel.
   - Backend on Render/Heroku.
   - Database on MongoDB Atlas.

---

## **Setup Instructions**

### Prerequisites
- Install [Node.js](https://nodejs.org/).
- Install [Git](https://git-scm.com/).
- Install [Visual Studio Code](https://code.visualstudio.com/).

### **1. Clone the Repository**
```bash
git clone https://github.com/<your-username>/user-auth-app.git
cd user-auth-app
```

### **2. Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

### **3. Backend Setup**
```bash
cd ../backend
npm install
node server.js
```

### **4. Environment Variables**
Create `.env` files in the respective directories with the following keys:

#### For Backend:
```
PORT=5000
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=<your-secret-key>
SMTP_USER=<your-email>
SMTP_PASS=<your-email-password>
```

#### For Frontend:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

---

## **Deployment Instructions**

### **Frontend**
1. Deploy the `frontend` folder on [Vercel](https://vercel.com/).
2. Add the backend URL to the environment variables in the Vercel dashboard.

### **Backend**
1. Deploy the `backend` folder on [Render](https://render.com/) or [Heroku](https://www.heroku.com/).
2. Add the necessary environment variables (as shown above).

### **Database**
Use [MongoDB Atlas](https://www.mongodb.com/atlas) to host your database.

---

## **API Endpoints**

| Endpoint         | Method | Description              |
|------------------|--------|--------------------------|
| `/register`      | POST   | Register a new user      |
| `/login`         | POST   | User login and OTP send  |
| `/verify-otp`    | POST   | OTP validation           |
| `/delete-account`| DELETE | Delete a user account    |

---

## **Acknowledgements**
- [React Hook Form](https://react-hook-form.com/)
- [Multer](https://github.com/expressjs/multer)
- [Axios](https://axios-http.com/)
- [Next.js](https://nextjs.org/)
- [Express.js](https://expressjs.com/)

---

Feel free to reach out to me for detailed application report and explaination! 🎉
