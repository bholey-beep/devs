"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../lib/api";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

const styles: any = {
  container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#0f172a" },
  card: { padding: 30, background: "#1e293b", width: 320, display: "flex", flexDirection: "column", gap: 10 },
};