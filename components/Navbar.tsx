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
  const [isPending, startTransition] = useTransition();

  const switchLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    startTransition(() => {
      const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "";
      const newPath = `/${newLocale}${pathWithoutLocale}`;
      router.push(newPath);
    });
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`}>
              <Image
                src="/media/assets/theme-imgs/Business-Core-white.webp"
                alt="4eBusinessCore"
                width={180}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="flex items-center gap-8">
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

            <Link
              href={`/${locale}/achievements`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t("achievements")}
            </Link>

            <Link
              href={`/${locale}/about`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t("about")}
            </Link>
          </div>

          {/* Right: Language Switcher */}
          <div>
            <button
              onClick={switchLanguage}
              disabled={isPending}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors disabled:opacity-50"
            >
              <Image
                src={
                  locale === "ar"
                    ? "/media/assets/b-core-icons/usa.svg"
                    : "/media/assets/b-core-icons/saudi.svg"
                }
                alt={locale === "ar" ? "English" : "العربية"}
                width={24}
                height={24}
                className="rounded"
              />
              {locale === "ar" ? "English" : "العربية"}
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {servicesOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setServicesOpen(false)}
        />
      )}
    </nav>
  );
}
