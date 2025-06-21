"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./auth.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sign up</h1>
      <form className="regForm" onSubmit={handleRegister}>
        <input
          className="regUsername"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          className="regPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="regButton" type="submit">
          Register
        </button>
      </form>
      <div className="signIn">
        <Link href={"/login"}>
          <h4
            style={{ textDecoration: "underline" }}
            className="registerButton"
          >
            You already have an Account? Click here to sign in
          </h4>
        </Link>
      </div>
    </div>
  );
}
