"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { templates } from "@/config/templates";
import { ArrowLeft } from "lucide-react";

export default function TemplateFormPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const locale = useLocale();
  const router = useRouter();

  const template = templates.find((t) => t.slug === resolvedParams.slug);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<Record<string, any>>({});

  if (!template) {
    return <div className="p-8 text-center text-red-500">Template not found.</div>;
  }

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted for AI Generation:", { templateId: template.id, data: formData });
    // Future Phase: Redirect to AI Generation / Drafting view with data
    alert("Drafting feature to be implemented in Phase 3. Form Data saved to console.");
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

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
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
                className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                {locale === 'bn' ? 'চুক্তি তৈরি করুন' : 'Generate Contract'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
