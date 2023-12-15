"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [conPassword, setConPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  function generateUniqueAlphanumericToken(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const tokenLength = length || 4;
    const tokens: Set<string> = new Set();

    while (true) {
      let newToken = "";

      for (let i = 0; i < tokenLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        newToken += characters.charAt(randomIndex);
      }

      if (!tokens.has(newToken)) {
        tokens.add(newToken);
        return newToken;
      }
    }
  }

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password === conPassword) {
      const token = generateUniqueAlphanumericToken(4);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          token: token,
        }),
      });
      console.log(response);
      const data = await response.json();

      if (data.message.includes("Success")) {
        router.push("/verify");
      } else if (data.message.includes("Email")) {
        setError(`${data.message}`);
        setTimeout(() => setError(""), 10000);
        return;
      } else if (data.message.includes("Password")) {
        setError(`${data.message}`);
        setTimeout(() => setError(""), 30000);
        return;
      } else {
        // alert("Registration failed. Please try again.");
      }
    } else {
      setError("Password does not match.");
      setTimeout(() => setError(""), 10000);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray flex w-96 flex-col items-center justify-center rounded p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-blue-800">Register</h2>
        {error &&
          // <p className="w-4/5 text-sm text-red-600">*{error}</p>
          error.split("/").map((err, i) => (
            <li key={i} className="w-4/5 text-xs text-red-600">
              {err}
            </li>
          ))}
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="conPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="conPassword"
              name="conPassword"
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
              className="mt-1 w-full rounded-md border p-2"
              required
            />
          </div>

          <div className="mt-4 flex items-center justify-center">
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-4">
          Already have an account?
          <Link href="signin" className="text-blue-700">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
