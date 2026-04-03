import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const contracts = await prisma.contract.findMany({
      where: { user: { email: session.user.email } },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        templateId: true,
        status: true,
        pdfUrl: true,
        createdAt: true,
      },
    });

    return NextResponse.json(contracts);
  } catch (_error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { templateId, content, pdfBase64, slug, userId: requestUserId } = await req.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = (session.user as any).id;
    if (userId !== requestUserId) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    let finalPdfUrl = null;

    if (pdfBase64 && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      );

      const buffer = Buffer.from(pdfBase64, 'base64');
      const fileName = `${userId}/${Date.now()}-${slug}.pdf`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('contracts')
        .upload(fileName, buffer, { contentType: 'application/pdf' });

      if (!uploadError && uploadData) {
        const { data: publicUrlData } = supabase.storage
          .from('contracts')
          .getPublicUrl(fileName);

        finalPdfUrl = publicUrlData.publicUrl;
      }
    }

    const newContract = await prisma.contract.create({
      data: {
        userId,
        templateId,
        content,
        pdfUrl: finalPdfUrl,
        status: 'DRAFT', // Default until payment gateways are connected
      },
    });

    return NextResponse.json({ message: "Contract saved to vault", contractId: newContract.id }, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
