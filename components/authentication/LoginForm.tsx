"use client";

import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("email", email, password);
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    console.log("result", result);

    if (!result.ok) {
      setError("Invalid credentials. Please try again.");
    }

    console.log(result);

    if (!result.error) {
      router.push("/");
      router.refresh();
    } else {
      alert(`${result.error}`);
    }
  };

  if (error) {
    setTimeout(() => setError(""), 5000);
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-96 flex-col items-center justify-center rounded bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-blue-800">Sign In</h2>
        {error && <p className="font-sans text-sm text-red-500">*{error}</p>}
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

          <div className="mt-4 flex items-center justify-center">
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-4">
          Don't have an account?
          <Link href="/register" className="text-blue-700">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
