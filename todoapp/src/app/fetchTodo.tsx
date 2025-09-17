"use client";

import DeleteTodo from "./deleteTodo";

type Todo = {
  _id: string;
  text: string;
  done: boolean;
};

type TodoListProps = {
  todos: Todo[];
  onDelete: (deletedId: string) => void;
};

const TodoList = ({ todos, onDelete }: TodoListProps) => {
  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <li key={todo._id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <span className="text-lg text-black">{todo.text}</span>
            <div className="flex items-center gap-2">
              <DeleteTodo todoId={todo._id} onDelete={onDelete} />
              <span className={`px-2 py-1 rounded text-sm ${todo.done ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                {todo.done ? "Done" : "Pending"}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
