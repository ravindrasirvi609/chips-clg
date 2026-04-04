import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title:
    "ABAP 2026 International Conference | CHIPS, Guntur",
  description:
    "20th Annual Convention of ABAP and International Conference on Global Perspectives of Artificial Intelligence and Quantum Technologies in Healthcare, Pharmaceutical, Biotechnological and Agricultural Innovations (21-23 December 2026).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
      >
        <div className="main-container min-h-screen flex flex-col relative">
          <Header />
          <main className="pt-20 flex-1 flex flex-col relative z-10">
            {children}
            <Analytics />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
