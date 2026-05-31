"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../lib/api";

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = () => localStorage.getItem("token");

  useEffect(() => {
    if (!token()) router.push("/login");
    else loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await fetch(`${API}/tasks`, {
      headers: { Authorization: token() || "" },
    });

    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token() || "",
      },
      body: JSON.stringify({ title, description }),
    });

    setTitle("");
    setDescription("");
    loadTasks();
  };

  const deleteTask = async (id: number) => {
    await fetch(`${API}/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: token() || "" },
    });

    loadTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2>Dashboard</h2>
          <button onClick={logout}>Logout</button>
        </div>

        <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />

        <button onClick={addTask}>Add Task</button>

        {tasks.map((t) => (
          <div key={t.id} style={styles.task}>
            <div>
              <b>{t.title}</b>
              <p>{t.description}</p>
              <small>{t.status}</small>
            </div>

            <button onClick={() => deleteTask(t.id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}
const styles: any = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "white",
  },

  card: {
    width: 600,
    background: "#1e293b",
    padding: 20,
    borderRadius: 16,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  logout: {
    background: "#ef4444",
    border: "none",
    padding: 8,
    color: "white",
    borderRadius: 6,
  },

  inputBox: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },

  addBtn: {
    background: "#3b82f6",
    color: "white",
    padding: 10,
    border: "none",
    borderRadius: 6,
  },

  updateBtn: {
    background: "#f59e0b",
    color: "black",
    padding: 10,
    border: "none",
    borderRadius: 6,
  },

  task: {
    background: "#334155",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    display: "flex",
    justifyContent: "space-between",
  },

  actions: {
    display: "flex",
    gap: 10,
  },
};