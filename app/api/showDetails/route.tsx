import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return {
      status: 405,
      body: { error: "Method Not Allowedaaaaaa" },
    };
  }

  try {
    const {
      showName,
      showType,
      showDateAndTime,
      noOfTickets,
      showMode,
      categories,
    } = await request.json();
s
    const Id = "clq511pdy0000op42iuzmwsej";
    const showDetails = await prisma.showDetails.create({
      data: {
        showName: showName,
        showType: showType,
        showDateAndTime: new Date(showDateAndTime),
        noOfTickets: parseInt(noOfTickets),
        createdBy: {
          connect: { id: Id },
        },
      },
      include: { showTickets: true },
    });

    const showTicket = await prisma.showTicket.create({
      data: {
        showMode: showMode,
        categories: categories,
        showDetail: {
          connect: { id: showDetails.id },
        },
      },
    });

    return NextResponse.json(
      { message: "Show details and tickets saved successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating show details:", error);
    return NextResponse.json(
      { message: "error", error: err.message },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
