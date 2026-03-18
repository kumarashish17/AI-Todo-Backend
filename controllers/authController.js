import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  const { name, email, password } = req.body

  const existing = await User.findOne({ email })
  if (existing) {
    return res.status(400).json({ message: "User already exists" })
  }

  const hashed = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashed
  })

  res.status(201).json({ message: "User created", user })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ message: "User not found" })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(400).json({ message: "Invalid password" })

  const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "7d" })

  res.json({ token, user })
}