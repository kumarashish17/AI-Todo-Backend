import mongoose from "mongoose"

const todoSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  completed: {
    type: Boolean,
    default: false
  },

  priority: {
    type: String,
    enum: ["low","medium","high"],
    default: "low"
  },

  category: {
    type: String,
    default: "general"
  },

  dueDate: Date

},{ timestamps:true })

export default mongoose.model("Todo",todoSchema)