import prisma from "@/lib/prisma";
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
