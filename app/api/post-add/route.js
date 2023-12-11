import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

const { NextResponse } = require("next/server");

export async function POST(request) {
  const res = await request.json();
  const { title, content } = res;
  console.log(title, content);

  const sessionUser = await getServerSession();
  console.log(sessionUser.user.email);

  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: true,
      author: { connect: { email: sessionUser.user.email } },
    },
  });
  return NextResponse.json({ result });
}
