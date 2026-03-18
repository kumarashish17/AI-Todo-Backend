import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import connectDB from "./config/db.js"
import todoRoutes from "./routes/todoRoutes.js"
import authRoutes from "./routes/authRoutes.js"
 import aiRoutes from "./routes/aiRoutes.js"

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

// routes
app.use("/api/todos", todoRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/ai", aiRoutes)
app.listen(5000, () => {
  console.log("Server running on port 5000")
})