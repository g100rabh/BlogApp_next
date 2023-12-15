import DashbordMain from "@/components/dashboardElement/DashbordMain";
import prisma from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Dasboard() {
  return <DashbordMain />;
}
