"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./auth.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/");
    } else {
      alert(data.error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>
      <input
        style={{ marginTop: "10px", width: "33%" }}
        className="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        style={{ marginTop: "-10px", width: "33%" }}
        className="password"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button
        style={{ marginTop: "-10px", width: "33%" }}
        className="loginButton"
        onClick={handleLogin}
      >
        Login
      </button>
      <div>
        <Link href={"/register"}>
          <h4
            style={{ textDecoration: "underline" }}
            className="registerButton"
          >
            Do not have Account? Click here to sign up
          </h4>
        </Link>
      </div>
    </div>
  );
}
