import ProfileCompleteForm from "@/components/profile/ProfileCompleteForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Profile() {
  const session = await getServerSession();
  if (!session) redirect("/signin");
  return <ProfileCompleteForm />;
}
