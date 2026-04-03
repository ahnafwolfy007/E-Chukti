"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Clock } from "lucide-react";
import { useLocale } from "next-intl";
import { templates } from "@/config/templates";

interface Contract {
  id: string;
  templateId: string;
  status: string;
  pdfUrl: string | null;
  createdAt: string;
}

export default function VaultPage() {
  const { status } = useSession();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();

  useEffect(() => {
    if (status === "authenticated") {
      fetchContracts();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const fetchContracts = async () => {
    try {
      const res = await fetch("/api/vault");
      if (res.ok) {
        const data = await res.json();
        setContracts(data);
      }
    } catch (error) {
      console.error("Failed to fetch contracts", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return <div className="p-8 text-center">Loading vault...</div>;
  }

  if (status === "unauthenticated") {
    return <div className="p-8 text-center text-gray-500">Please log in to view your Document Vault.</div>;
  }

  const getTemplateTitle = (templateId: string) => {
    const t = templates.find(x => x.id === templateId);
    if (!t) return templateId;
    return locale === 'bn' ? t.titleBn : t.titleEn;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {locale === 'bn' ? 'ডকুমেন্ট ভল্ট' : 'Document Vault'}
          </h1>
          <p className="text-gray-500 mt-2">
            {locale === 'bn' ? 'আপনার পূর্বে তৈরি করা এবং সংরক্ষিত চুক্তিসমূহ' : 'Your previously generated and saved contracts.'}
          </p>
        </div>

        {contracts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No documents found</h3>
            <p className="text-gray-500 mt-1">Generate a contract from the template gallery to see it here.</p>
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
            <ul className="divide-y divide-gray-200">
              {contracts.map((contract, i) => (
                <motion.li
                  key={contract.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">
                          {getTemplateTitle(contract.templateId)}
                        </h4>
                        <div className="flex items-center text-sm text-gray-500 mt-1 gap-4">
                          <span className="flex items-center"><Clock size={14} className="mr-1" /> {new Date(contract.createdAt).toLocaleDateString()}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            contract.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                            contract.status === 'PENDING_PAYMENT' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {contract.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {contract.pdfUrl ? (
                        <a
                          href={contract.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                          <Download size={16} />
                          {locale === 'bn' ? 'ডাউনলোড' : 'Download PDF'}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400 italic">No PDF generated</span>
                      )}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
