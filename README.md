# 🍛 Jeya Hotel - Full Stack Restaurant Website

> Authentic Home Style Food with 10+ Years of Trust

## 📁 Project Structure

```
jeya-hotel/
├── frontend/          # React.js frontend
├── backend/           # Node.js + Express backend
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- npm or yarn

---

## 🔧 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your MongoDB URI and other env vars
npm run dev
```

Backend runs on: http://localhost:5000

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Fill in REACT_APP_API_URL=http://localhost:5000
npm start
```

Frontend runs on: http://localhost:3000

---

## 🌐 Environment Variables

### Backend `.env`
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/jeya-hotel
PORT=5000
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
OWNER_WHATSAPP=whatsapp:+918946086668
ADMIN_SECRET=your_admin_secret_key
```

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 📦 Features
- 🛒 Online Food Ordering with Cart
- 📱 WhatsApp Notifications to Owner
- 🗄️ MongoDB Order Storage
- 👨‍💼 Admin Dashboard
- 🎉 Festival/Bulk Order Enquiry
- ⭐ Customer Reviews
- 📍 Contact & Maps Integration
- 💬 Floating WhatsApp Button
- 📲 Fully Mobile Responsive

## 🚀 Deployment

### Frontend → Vercel / Netlify
```bash
cd frontend && npm run build
# Deploy the build/ folder
```

### Backend → Railway / Render
```bash
cd backend
# Set environment variables in dashboard
# Deploy with npm start
```
