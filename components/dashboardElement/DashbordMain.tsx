"use client";

import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DashbordMain() {
  const [isProfileCompleted, setIsProfileCompleted] = useState();
  const getProfileComplete = async () => {
    try {
      const res = await fetch("/api/profilecomplete", {
        method: "GET",
      });
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        setIsProfileCompleted(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileComplete();
  }, []);

  if (!isProfileCompleted) {
    redirect("/profile");
  }

  return <div>DashbordMain</div>;
}
