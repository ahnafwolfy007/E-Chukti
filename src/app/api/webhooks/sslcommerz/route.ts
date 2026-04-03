import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const statusParams = url.searchParams.get("status");
    const tran_id_param = url.searchParams.get("tran_id");

    const textPayload = await req.text();
    const params = new URLSearchParams(textPayload);

    const paymentStatus = params.get("status") || statusParams;
    const transactionId = params.get("tran_id") || tran_id_param;

    if (!transactionId || !paymentStatus) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const payment = await prisma.payment.findUnique({
      where: { transactionId }
    });

    if (!payment) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
    }

    if (paymentStatus === 'VALID' || paymentStatus === 'success') {
      // 1. Update Payment Status
      await prisma.payment.update({
        where: { transactionId },
        data: { paymentStatus: 'SUCCESS' }
      });

      // 2. Update Contract Status to COMPLETED to unlock download
      await prisma.contract.update({
        where: { id: payment.contractId },
        data: { status: 'COMPLETED' }
      });

      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/en/payment/success?txId=${transactionId}`);
    } else if (paymentStatus === 'FAILED' || paymentStatus === 'fail') {
      await prisma.payment.update({
        where: { transactionId },
        data: { paymentStatus: 'FAILED' }
      });
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/en/payment/fail?txId=${transactionId}`);
    } else if (paymentStatus === 'CANCELLED' || paymentStatus === 'cancel') {
      await prisma.payment.update({
        where: { transactionId },
        data: { paymentStatus: 'CANCELLED' }
      });
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/en/payment/fail?txId=${transactionId}&reason=cancelled`);
    }

    return NextResponse.json({ message: "Unhandled status" }, { status: 400 });

  } catch (error: unknown) {
    console.error("SSLCommerz Webhook Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
