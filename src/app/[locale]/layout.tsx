/* eslint-disable  @typescript-eslint/no-explicit-any */

import type { Metadata } from "next";
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import "./globals.css";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import TrpcProvider from "../_trpc/TrpcProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {

  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="scroll-bar-custom">
        <div className="grid grid-cols-15 gap-x-6 px-16 max-w-3xl mx-auto relative">
          <NextIntlClientProvider messages={messages}>
            <TrpcProvider>
              <SmoothScroll>
                {children} 
              </SmoothScroll>
            </TrpcProvider>
          </NextIntlClientProvider>
        </div>
        <Toaster position="top-right" visibleToasts={2} duration={2000} />
      </body>
    </html>
  );
}
