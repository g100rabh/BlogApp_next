import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession();
  let isProfileComplete;

  if (session && session.user) {
    const email = session.user.email;
    if (email) {
      const userData = await prisma.user.findUnique({
        where: { email },
      });
      // console.log(userData);

      isProfileComplete = userData?.isProfileComplete;
    }
  }
  // console.log(isProfileComplete);
  return NextResponse.json(isProfileComplete);
}
