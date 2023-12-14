"use client";

import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DashbordMain() {
  const getProfileComplete = async () => {
    try {
      const res = await fetch("/api/profilecomplete", {
        method: "GET",
      });
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        return data;
        // setIsProfileCompleted(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isProfileCompleted = getProfileComplete();
  console.log(isProfileCompleted);

  if (!isProfileCompleted) {
    redirect("/profile");
  }

  return <div>DashbordMain</div>;
}
