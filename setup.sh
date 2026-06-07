#!/bin/bash
echo "=========================================="
echo "  🍛 Jeya Hotel - Setup & Start"
echo "=========================================="
echo ""

echo "[1/3] Installing Backend dependencies..."
cd backend && npm install
if [ $? -ne 0 ]; then echo "ERROR: Backend install failed"; exit 1; fi

echo ""
echo "[2/3] Installing Frontend dependencies..."
cd ../frontend && npm install
if [ $? -ne 0 ]; then echo "ERROR: Frontend install failed"; exit 1; fi

echo ""
echo "[3/3] Checking .env files..."
cd ../backend
if [ ! -f .env ]; then
  cp .env.example .env
  echo "  ⚠️  backend/.env created from example - PLEASE EDIT IT!"
fi
cd ../frontend
if [ ! -f .env ]; then
  cp .env.example .env
  echo "  ⚠️  frontend/.env created from example"
fi

echo ""
echo "=========================================="
echo "  ✅ Setup Complete!"
echo "=========================================="
echo ""
echo "NEXT STEPS:"
echo "  1. Edit backend/.env with your MongoDB URI and Twilio keys"
echo "  2. In terminal 1: cd backend && npm run dev"
echo "  3. In terminal 2: cd frontend && npm start"
echo ""
