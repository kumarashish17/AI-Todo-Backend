import dotenv from "dotenv"
dotenv.config()

import Groq from "groq-sdk"
import Todo from "../models/Todo.js"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export const generatePlan = async (req, res) => {
  try {

    const { goal } = req.body

    console.log("Goal:", goal)
    console.log("User:", req.user)

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a productivity planner. Always return ONLY JSON."
        },
        {
          role: "user",
          content: `Create a step-by-step task plan with dates for this goal: ${goal}

Return JSON like:
[
 {"title":"Task 1","date":"2026-03-16"},
 {"title":"Task 2","date":"2026-03-17"}
]`
        }
      ]
    })

    const aiText = completion.choices[0].message.content

    console.log("AI Response:", aiText)

    const start = aiText.indexOf("[")
    const end = aiText.lastIndexOf("]") + 1

    const tasks = JSON.parse(aiText.slice(start, end))

    const todos = await Promise.all(
      tasks.map(task =>
        Todo.create({
          userId: req.user.id,
          title: task.title,
          dueDate: new Date(task.date),
          priority: "medium",
          category: "AI"
        })
      )
    )

    console.log("Saved Todos:", todos)

    res.json(todos)

  } catch (err) {
    console.error("AI ERROR:", err)
    res.status(500).json({ message: err.message })
  }
}