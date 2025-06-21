"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TodosPage() {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState("todo");
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:4000/api/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const res = await fetch("http://localhost:4000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: newTodo,
        description: newDescription,
        status: newStatus,
      }),
    });

    if (res.ok) {
      setNewTodo("");
      setNewDescription("");
      setNewStatus("todo");
      fetchTodos();
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);

    await fetch(`http://localhost:4000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:4000/api/todos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchTodos();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const filteredTodos = todos.filter((todo) =>
    statusFilter === "all" ? true : todo.status === statusFilter
  );

  return (
    <div className="app-container">
      <div className="todo-header">
        <h1>Your ToDo List</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="todo-inputs">
        <input
          className="enterToDo"
          type="text"
          value={newTodo}
          required
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
        <input
          type="text"
          value={newDescription}
          required
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter new description"
        />
        <select
          className="statusMenu"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button onClick={addTodo}>Add ToDo</button>
      </div>

      <div className="status-filter">
        <label>Status Filter: </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="todo-list">
        {filteredTodos.map((data) => (
          <div key={data.id} className="card">
            <div className="content">
              <span className="title">{data.text}</span>
              <p className="desc">{data.description}</p>

              <select
                className="status-select"
                value={data.status}
                onChange={(e) => updateStatus(data.id, e.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>

              <button
                className="delete-btn"
                onClick={() => deleteTodo(data.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
