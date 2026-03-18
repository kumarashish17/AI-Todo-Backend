import Todo from "../models/Todo.js"

// Get todos for logged-in user
export const getTodos = async (req, res) => {
  try {

    const todos = await Todo.find({
      userId: req.user.id
    }).sort({ createdAt: -1 })

    res.status(200).json(todos)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// Create todo for logged-in user
export const createTodo = async (req, res) => {
  try {

    const { title, priority, category, dueDate } = req.body

    if (!title) {
      return res.status(400).json({ message: "Title is required" })
    }

    const todoData = {
      userId: req.user.id,
      title,
      priority,
      category
    }

    if (dueDate) {
      todoData.dueDate = new Date(dueDate)
    }

    const todo = await Todo.create(todoData)

    res.status(201).json(todo)

  } catch (error) {
    console.error("Create Todo Error:", error)
    res.status(500).json({ message: error.message })
  }
}


// Update todo (only if it belongs to user)
export const updateTodo = async (req, res) => {
  try {

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    )

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" })
    }

    res.status(200).json(todo)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// Delete todo (only if it belongs to user)
export const deleteTodo = async (req, res) => {
  try {

    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    })

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" })
    }

    res.status(200).json({ message: "Todo deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}