import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import connectDB from "./config/db.js"
import todoRoutes from "./routes/todoRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"

const app = express()

// connect DB
connectDB()

// middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://todo-ai-inky-chi.vercel.app"
  ],
  credentials: true
}))

app.use(express.json())

// routes
app.use("/api/todos", todoRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/ai", aiRoutes)

// root route (optional but useful)
app.get("/", (req, res) => {
  res.send("API running 🚀")
})

// 🔥 IMPORTANT FIX
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})