import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import mongoose from 'mongoose';
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// using .env file to connect to the mongo db
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


// this is the model for the todo using mongoose
const Todo = mongoose.model('Todo', {
  text: String,
  done: { type: Boolean, default: false }
});

// READ 
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// CREATE 
app.post('/todos', async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    done: false
  });
  await todo.save();
  res.json(todo);
});

// UPDATE
app.put('/todos/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(todo);
});

// DELETE 
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));