"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'bn' : 'en';

    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      aria-label="Toggle language"
    >
      <span className={locale === 'en' ? 'font-bold' : ''}>EN</span>
      <span className="mx-1 text-gray-400">/</span>
      <span className={locale === 'bn' ? 'font-bold' : ''}>BN</span>
    </button>
  );
}
