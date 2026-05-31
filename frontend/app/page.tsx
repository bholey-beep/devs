import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>🚀 Task Manager</h1>
        <p>DevOps Ready Full Stack App</p>

        <Link href="/login" style={styles.btn}>Login</Link>
        <Link href="/register" style={styles.btn2}>Register</Link>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "white",
  },
  card: {
    padding: 40,
    background: "#1e293b",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: 300,
    textAlign: "center",
  },
  btn: { padding: 10, background: "#3b82f6", color: "white", textDecoration: "none" },
  btn2: { padding: 10, background: "#10b981", color: "white", textDecoration: "none" },
};