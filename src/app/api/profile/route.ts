import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        name: true,
        companyName: true,
        nid: true,
        tin: true,
        bin: true,
        digitalSignature: true,
        preferredLanguage: true
      },
    });

    return NextResponse.json(user);
  } catch (_error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: data.name,
        companyName: data.companyName,
        nid: data.nid,
        tin: data.tin,
        bin: data.bin,
        digitalSignature: data.digitalSignature,
        preferredLanguage: data.preferredLanguage
      },
    });

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (_error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
