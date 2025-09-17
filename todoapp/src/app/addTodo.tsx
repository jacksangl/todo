"use client";
// stuff
import { useState } from "react";
import { TODOS_ENDPOINT } from "../constants";

type Todo = {
  _id: string;
  text: string;
  done: boolean;
};

type AddTodoProps = {
  onAdd: (newTodo: Todo) => void;
  demoMode?: boolean;
};

const AddTodo = ({ onAdd, demoMode }: AddTodoProps) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;

    if (demoMode) {
      const newTodo = {
        _id: Date.now().toString(),
        text: input,
        done: false
      };
      onAdd(newTodo);
      setInput("");
      return;
    }

    fetch(TODOS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(newTodo => {
        onAdd(newTodo);
        setInput("");
      })
      .catch(err => {
        console.error("Add todo error:", err);
        alert("Failed to add todo. Please try again.");
      });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <input
        type="text"
        placeholder="Add a todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 border text-black rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleAdd}
        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTodo;