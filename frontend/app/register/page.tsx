"use client";

import { useState } from "react";
import API from "../../lib/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    alert("Registered");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}

const styles: any = {
  container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#0f172a" },
  card: { padding: 30, background: "#1e293b", width: 320, display: "flex", flexDirection: "column", gap: 10 },
};