"use client";

import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DashbordMain() {
  const router = useRouter();
  const getProfileComplete = async () => {
    try {
      const res = await fetch("api/profilecomplete", {
        method: "GET",
      });
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        if (!data) {
          router.push("/profile");
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  getProfileComplete();

  return <div>DashbordMain</div>;
}
