import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: {
  json: () =>
    | PromiseLike<{ email: any; verificationCode: any }>
    | { email: any; verificationCode: any };
}) {
  const { email, verificationCode } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: email, token: verificationCode },
    });

    if (user) {
      const res = await prisma.user.update({
        where: { email },
        data: {
          isEmailVerified: true,
          isActive: true,
          token: "",
        },
      });

      if (res) {
        return NextResponse.json(true);
      } else {
        return NextResponse.json(
          { error: "Failed to update user" },
          { status: 500 },
        );
      }
    } else {
      return NextResponse.json(
        { error: "User not found or verification code is incorrect" },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error during user verification:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const session = await getServerSession();

  if (session && session.user) {
    const email = session.user.email;
    if (email) {
      const userData = await prisma.user.findUnique({
        where: { email },
      });

      return NextResponse.json(userData);
    }
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession();
  const email = session?.user?.email || "";

  const newData = await request.json();
  console.log(newData);

  const res = await prisma.user.update({
    where: { email },
    data: {
      ...newData,
    },
  });

  return NextResponse.json({});
}
