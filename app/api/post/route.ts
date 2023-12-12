import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

const { NextResponse } = require("next/server");

export async function POST(request: { json: () => any }) {
  const res = await request.json();
  const { title, content } = res;
  console.log(title, content);

  const sessionUser = await getServerSession();

  // Check if sessionUser is not null and sessionUser.user is not undefined
  if (sessionUser && sessionUser.user && sessionUser.user.email) {
    const result = await prisma.post.create({
      data: {
        title,
        content,
        published: true,
        author: { connect: { email: sessionUser.user.email } },
      },
    });

    return NextResponse.json({ result });
  } else {
    // Handle the case where sessionUser or sessionUser.user is null or undefined
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }
}
export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { email: true },
      },
    },
  });

  return NextResponse.json(posts);
}
