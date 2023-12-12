"use client";

import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const UserVerificationForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode }),
      });
      // const data = await res.json();
      // console.log(res);

      if (res.ok) {
        alert("Verification done successfully");
        router.push("/signin");
        setEmail("");
        setVerificationCode("");
      } else if (res.status === 404) {
        throw new Error("User not found or verification code is incorrect");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-md bg-white p-8 shadow-md"
    >
      <h2 className="mb-6 text-2xl font-bold">User Verification</h2>

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
          className="mt-1 w-full rounded-md border p-2"
          required
          value={email}
          onChange={handleEmailChange}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="verificationCode"
          className="block text-sm font-medium text-gray-600"
        >
          Verification Code
        </label>
        <input
          type="text"
          id="verificationCode"
          // pattern="\d{4}"
          className="mt-1 w-full rounded-md border p-2"
          required
          value={verificationCode}
          onChange={handleVerificationCodeChange}
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-green-500 px-4 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default UserVerificationForm;
