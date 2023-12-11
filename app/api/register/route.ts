import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  console.log(request);
  try {
    const { email, password, token } = await request.json();

    const hashedPassword = await hash(password, 10);

    console.log(hashedPassword);
    const roleUser = "USER";

    const result = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        role: roleUser,
        token: token,
      },
    });

    console.log("email:", email, "password:", password);
  } catch (err) {
    console.error(err);
  }

  return NextResponse.json({ message: "success" });
}
