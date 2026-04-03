"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { templates } from "@/config/templates";
import { ArrowLeft, Sparkles, Download, CheckCircle, Save } from "lucide-react";
import { pdf } from '@react-pdf/renderer';
import { ContractPDF } from "@/components/ContractPDF";
import { supabase } from "@/lib/supabase";
import { useSession } from "next-auth/react";

export default function TemplateFormPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const locale = useLocale();
  const router = useRouter();
  const { data: session } = useSession();

  const template = templates.find((t) => t.slug === resolvedParams.slug);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [generatedContract, setGeneratedContract] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!template) {
    return <div className="p-8 text-center text-red-500">Template not found.</div>;
  }

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const generateAIContract = async (e: React.FormEvent, targetLanguage: string = locale) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: template.id,
          formData,
          targetLanguage
        })
      });

      if (!res.ok) throw new Error("Failed to generate contract");

      const data = await res.json();
      setGeneratedContract(data.content);
      setSaved(false);
    } catch (error) {
      console.error(error);
      alert("Error generating contract. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndDownload = async () => {
    if (!generatedContract || !session?.user) {
      alert("Please log in and generate a contract first.");
      return;
    }

    setSaving(true);
    try {
      // 1. Generate PDF Blob locally
      const doc = <ContractPDF
                    title={locale === 'bn' ? template.titleBn : template.titleEn}
                    content={generatedContract}
                    firstPartyName={formData.firstPartyName}
                    secondPartyName={formData.secondPartyName}
                  />;
      const asPdf = pdf();
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();

      // 2. Download locally for user immediately
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${template.slug}-echukti.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      // 3. Save metadata to Prisma (Vault) and receive Secure Signed URL logic
      //    (Backend handles Supabase upload to respect service role constraints when NextAuth is used)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userId = (session.user as any).id;

      // Convert Blob to base64 to send to our internal API
      const arrayBuffer = await blob.arrayBuffer();
      const base64Pdf = Buffer.from(arrayBuffer).toString('base64');

      const res = await fetch("/api/vault", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: template.id,
          content: generatedContract,
          pdfBase64: base64Pdf,
          slug: template.slug,
          userId: userId
        })
      });

      if (!res.ok) throw new Error("Failed to save to vault");

      setSaved(true);
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save to Vault. The document downloaded locally.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.push('/templates')}
          className="mb-6 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          {locale === 'bn' ? 'ফিরে যান' : 'Back to Gallery'}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
            <h1 className="text-2xl font-bold text-gray-900">
              {locale === 'bn' ? template.titleBn : template.titleEn}
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {locale === 'bn' ? template.descriptionBn : template.descriptionEn}
            </p>
          </div>

          {!generatedContract && (
          <form onSubmit={(e) => generateAIContract(e)} className="p-8 space-y-6">
            {template.fields.map((field) => (
              <div key={field.id} className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'bn' ? field.labelBn : field.labelEn}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    required={field.required}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    rows={3}
                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                ) : field.type === 'select' ? (
                  <select
                    required={field.required}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="" disabled>Select an option</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {locale === 'bn' ? opt.labelBn : opt.labelEn}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    required={field.required}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                )}
              </div>
            ))}

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                {loading ? (
                  <span className="animate-pulse">{locale === 'bn' ? 'তৈরি হচ্ছে...' : 'Drafting...'}</span>
                ) : (
                  <>
                    <Sparkles size={18} className="mr-2" />
                    {locale === 'bn' ? 'চুক্তি তৈরি করুন' : 'Generate Contract'}
                  </>
                )}
              </button>
            </div>
          </form>
          )}

          {generatedContract && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-gray-100 gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {locale === 'bn' ? 'খসড়া পর্যালোচনা' : 'Contract Draft Preview'}
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => generateAIContract(e, locale === 'en' ? 'bn' : 'en')}
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Translating...' : (locale === 'en' ? 'Translate to Bengali' : 'Translate to English')}
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg text-sm text-gray-800 font-serif leading-relaxed whitespace-pre-wrap border border-gray-200 min-h-[400px] shadow-inner mb-6">
                {generatedContract}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-4 border-t border-gray-100 pt-6">
                <button
                  onClick={() => setGeneratedContract(null)}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {locale === 'bn' ? 'পুনরায় সম্পাদনা' : 'Edit Inputs'}
                </button>
                <button
                  onClick={handleSaveAndDownload}
                  disabled={saving || saved || !session}
                  className="flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm"
                >
                  {saving ? (
                    <span className="animate-pulse flex items-center"><Save size={18} className="mr-2"/> Saving...</span>
                  ) : saved ? (
                    <span className="flex items-center"><CheckCircle size={18} className="mr-2"/> Saved to Vault</span>
                  ) : (
                    <span className="flex items-center"><Download size={18} className="mr-2"/> Save & Download PDF</span>
                  )}
                </button>
              </div>
              {!session && (
                 <p className="text-xs text-red-500 mt-2 text-right">You must be logged in to save and download.</p>
              )}
            </motion.div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
