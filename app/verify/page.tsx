import React from "react";
import UserVerificationForm from "@/components/userVerify/UserVerificationForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Verify() {
  const session = await getServerSession();
  if (session) {
    redirect("/profile");
  }
  return <UserVerificationForm />;
}
