import { NextIntlClientProvider } from "next-intl";
import { locales } from "@/i18n";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "4eBusinessCore",
  description: "IT Services and IT Consulting",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params in Next.js 16
  const { locale } = await params;

  // Validate locale
  const isValidLocale = locales.includes(locale as any);

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    messages = (await import(`@/messages/en.json`)).default;
  }

  return (
    <html
      lang={isValidLocale ? locale : "en"}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider
          locale={isValidLocale ? locale : "en"}
          messages={messages}
        >
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
