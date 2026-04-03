"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

export default function PaymentFailPage() {
  const searchParams = useSearchParams();
  const txId = searchParams.get("txId");
  const reason = searchParams.get("reason");
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 text-center"
      >
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={40} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {locale === 'bn' ? 'পেমেন্ট ব্যর্থ হয়েছে' : 'Payment Failed'}
        </h1>
        <p className="text-gray-500 mb-6">
          {reason === 'cancelled'
            ? (locale === 'bn' ? 'আপনি পেমেন্ট বাতিল করেছেন।' : 'You cancelled the payment process.')
            : (locale === 'bn' ? 'একটি ত্রুটি ঘটেছে। দয়া করে আবার চেষ্টা করুন।' : 'An error occurred during the transaction. Please try again.')}
        </p>

        {txId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-8 border border-gray-100">
            <span className="text-xs text-gray-500 block uppercase tracking-wider font-semibold mb-1">Transaction ID</span>
            <span className="text-sm font-mono text-gray-800 break-all">{txId}</span>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link
            href="/vault"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors"
          >
            {locale === 'bn' ? 'ভল্টে ফিরে যান' : 'Return to Vault'}
          </Link>
          <Link
            href="/templates"
            className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg shadow-sm transition-colors"
          >
            {locale === 'bn' ? 'টেমপ্লেট গ্যালারি' : 'Template Gallery'}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
