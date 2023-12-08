"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [conPassword, setConPassword] = useState<string>("");

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password === conPassword) {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        alert("User successfully registered.");
        // Reset form state
        setEmail("");
        setPassword("");
        setConPassword("");
      } else {
        alert("Registration failed. Please try again.");
      }
    } else {
      alert("Password does not match");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray flex w-96 flex-col items-center justify-center rounded p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-blue-800">Register</h2>
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