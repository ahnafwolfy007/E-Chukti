import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { contractId } = await req.json();

    // Verify contract belongs to user
    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
      include: { user: true }
    });

    if (!contract || contract.user.email !== session.user.email) {
      return NextResponse.json({ message: "Contract not found or unauthorized" }, { status: 404 });
    }

    if (contract.status === 'COMPLETED') {
      return NextResponse.json({ message: "Contract is already paid for" }, { status: 400 });
    }

    // Pay-per-Contract Logic
    const amount = 500; // 500 BDT
    const currency = 'BDT';
    const transactionId = `TXN-${Date.now()}-${contractId.substring(0, 5)}`;

    const storeId = process.env.SSLCOMMERZ_STORE_ID;
    const storePassword = process.env.SSLCOMMERZ_STORE_PASSWORD;
    const isSandbox = process.env.SSLCOMMERZ_IS_SANDBOX === 'true';

    const gatewayUrl = isSandbox
      ? 'https://sandbox.sslcommerz.com/gwprocess/v3/api.php'
      : 'https://securepay.sslcommerz.com/gwprocess/v3/api.php';

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    // Update contract status to PENDING_PAYMENT
    await prisma.contract.update({
      where: { id: contractId },
      data: { status: 'PENDING_PAYMENT' }
    });

    // Create Payment Record
    await prisma.payment.create({
      data: {
        contractId,
        transactionId,
        amount,
        currency,
        gateway: 'SSLCOMMERZ',
        paymentStatus: 'PENDING',
      }
    });

    const data = new URLSearchParams({
      store_id: storeId || '',
      store_passwd: storePassword || '',
      total_amount: amount.toString(),
      currency: currency,
      tran_id: transactionId,
      success_url: `${baseUrl}/api/webhooks/sslcommerz?status=success&tran_id=${transactionId}`,
      fail_url: `${baseUrl}/api/webhooks/sslcommerz?status=fail&tran_id=${transactionId}`,
      cancel_url: `${baseUrl}/api/webhooks/sslcommerz?status=cancel&tran_id=${transactionId}`,
      ipn_url: `${baseUrl}/api/webhooks/sslcommerz`,
      cus_name: session.user.name || 'Unknown User',
      cus_email: session.user.email,
      cus_add1: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01700000000',
      shipping_method: 'NO',
      product_name: `eChukti Contract - ${contract.templateId}`,
      product_category: 'Digital Good',
      product_profile: 'non-physical-goods',
    });

    const response = await fetch(gatewayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data.toString(),
    });

    const result = await response.json();

    if (result.status === 'SUCCESS') {
      return NextResponse.json({ url: result.GatewayPageURL });
    } else {
      console.error('SSLCommerz Initialization Failed', result);
      return NextResponse.json({ message: "Payment Gateway Error", details: result.failedreason }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error("Payment Initiation Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
