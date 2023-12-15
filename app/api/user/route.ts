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
      where: {
        email: email,
        otps: {
          some: {
            otp: verificationCode,
          },
        },
      },
    });
    console.log(user);

    if (user) {
      const res = await prisma.user.update({
        where: { email },
        data: {
          isVerified: true,
          isActive: true,
          token: "",
        },
      });

      if (res) {
        const deleteRes = await prisma.userOtp.delete({
          where: { userId: res.id },
        });
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
  let result;

  if (newData.pincode && newData.pincode.length < 6) {
    result = { error: "Pincode should be at least 6 characters" };
  } else {
    const res = await prisma.user.update({
      where: { email },
      data: {
        ...newData,
      },
    });
    result = res;
  }

  if (
    result.mobile_number &&
    result.country &&
    result.state &&
    result.city &&
    result.pincode
  ) {
    const res = await prisma.user.update({
      where: { email },
      data: {
        isProfileComplete: true,
      },
    });
    result = res;
  }
  return NextResponse.json(result);
}
