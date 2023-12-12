import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import validator from "validator";
import { useState } from "react";

export async function POST(request: Request) {
  console.log(request);
  let message: String = "Success.";
  try {
    const { email, password, token } = await request.json();

    if (validator.isEmail(email)) {
      if (validator.isStrongPassword(password)) {
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
      } else {
        message =
          "Password must be at least 8 characters./Include at least one lowercase letter./One uppercase letter, one number./One special character.";
      }
    } else {
      message = "Email is not valid./";
    }
  } catch (err) {
    console.error(err);
  }

  return NextResponse.json({ message });
}
