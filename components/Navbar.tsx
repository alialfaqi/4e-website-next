"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, FileText, Briefcase, Users } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) {
      setLangOpen(false);
      return;
    }

    startTransition(() => {
      // Replace the current locale in the pathname with the new locale
      const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
      const newPath = `/${newLocale}${pathWithoutLocale}`;

      router.push(newPath);
      router.refresh();
      setLangOpen(false);
    });
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0">
            <Image
              src="/media/assets/theme-imgs/Business-Core-white.webp"
              alt="4eBusinessCore"
              width={180}
              height={50}
              className="h-12 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {/* Home Link */}
            <Link
              href={`/${locale}`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t("home")}
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {t("services")}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {servicesOpen && (
                <div className="absolute top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    href={`/${locale}/services/certificates`}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    <FileText className="w-5 h-5" />
                    {t("certificates")}
                  </Link>
                  <Link
                    href={`/${locale}/services/projects`}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    <Briefcase className="w-5 h-5" />
                    {t("projects")}
                  </Link>
                  <Link
                    href={`/${locale}/services/partners`}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    <Users className="w-5 h-5" />
                    {t("partners")}
                  </Link>
                </div>
              )}
            </div>

            {/* Achievements Link */}
            <Link
              href={`/${locale}/achievements`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t("achievements")}
            </Link>

            {/* About Us Link */}
            <Link
              href={`/${locale}/about`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t("about")}
            </Link>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                disabled={isPending}
              >
                <Image
                  src={
                    locale === "ar"
                      ? "/media/assets/b-core-icons/saudi.svg"
                      : "/media/assets/b-core-icons/usa.svg"
                  }
                  alt={locale === "ar" ? "Arabic" : "English"}
                  width={24}
                  height={24}
                  className="rounded"
                />
                {locale === "ar" ? "العربية" : "English"}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    langOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {langOpen && (
                <div className="absolute top-full mt-2 right-0 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => switchLanguage("en")}
                    disabled={isPending}
                    className="flex items-center gap-3 px-4 py-2 w-full text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors disabled:opacity-50"
                  >
                    <Image
                      src="/media/assets/b-core-icons/usa.svg"
                      alt="English"
                      width={20}
                      height={20}
                      className="rounded"
                    />
                    English
                  </button>
                  <button
                    onClick={() => switchLanguage("ar")}
                    disabled={isPending}
                    className="flex items-center gap-3 px-4 py-2 w-full text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors disabled:opacity-50"
                  >
                    <Image
                      src="/media/assets/b-core-icons/saudi.svg"
                      alt="العربية"
                      width={20}
                      height={20}
                      className="rounded"
                    />
                    العربية
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(servicesOpen || langOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setServicesOpen(false);
            setLangOpen(false);
          }}
        />
      )}
    </nav>
  );
}
