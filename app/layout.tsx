import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "4eBusinessCore",
  description: "IT Services and IT Consulting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
