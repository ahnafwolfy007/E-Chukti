"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const txId = searchParams.get("txId");
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 text-center"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {locale === 'bn' ? 'পেমেন্ট সফল হয়েছে!' : 'Payment Successful!'}
        </h1>
        <p className="text-gray-500 mb-6">
          {locale === 'bn' ? 'আপনার চুক্তি এখন ডাউনলোডের জন্য প্রস্তুত।' : 'Your contract is now ready for download in your Vault.'}
        </p>

        {txId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-8 border border-gray-100">
            <span className="text-xs text-gray-500 block uppercase tracking-wider font-semibold mb-1">Transaction ID</span>
            <span className="text-sm font-mono text-gray-800 break-all">{txId}</span>
          </div>
        )}

        <Link
          href="/vault"
          className="inline-block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors"
        >
          {locale === 'bn' ? 'ভল্টে যান' : 'Go to Vault'}
        </Link>
      </motion.div>
    </div>
  );
}
