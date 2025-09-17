"use client";

import { TODOS_ENDPOINT } from "../constants";


type Todo = {
  _id: string;
  text: string;
  done: boolean;
};

type DeleteTodoProps = {
  todoId: string;
  onDelete: (deletedId: string) => void;
    demoMode?: boolean;
};

export default function DeleteTodo({ todoId, onDelete, demoMode }: DeleteTodoProps) {
  const handleDelete = () => {
      if (demoMode) {
          onDelete(todoId);
          return;
      }

      fetch(`${TODOS_ENDPOINT}/${todoId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(() => {
        onDelete(todoId);
      })
      .catch(err => console.error("Delete error:", err));
  };
  
  return (
    <button 
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm" 
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}



