"use client";

import { useEffect, useState } from "react";
import { TODOS_ENDPOINT } from "../constants";
import AddTodo from "./addTodo";
import TodoList from "./fetchTodo";
type Todo = {
  _id: string;
  text: string;
  done: boolean;
};

export default function Home() {
  const [data, setData] = useState<Todo[]>([]);

  useEffect(() => {
    fetch(TODOS_ENDPOINT)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP e rror! status: ${res.status}`);
        }
        return res.json();
      })
      .then(setData)
      .catch(err => {
        console.error("Fetch todos error:", err);
        alert("Failed to load todos. Please refresh the page.");
      });
  }, []);

  const handleDelete = (deletedId: string) => {
    setData(prev => prev.filter(todo => todo._id !== deletedId));
  };

  return (
    <div className="font-sans min-h-screen p-8 bg-gray-50">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Todo List</h1>
        <AddTodo onAdd={(newTodo) => setData(prev => [...prev, newTodo])} />
        <TodoList todos={data} onDelete={handleDelete} />
      </div>
    </div>
  );
}
