import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Comfort Footwear Support | AI Customer Assistant",
  description:
    "24/7 AI-powered customer support for Comfort Footwear. Get help with orders, sizing, refunds, shipment tracking, and company policies.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // suppressHydrationWarning prevents React from complaining about the
      // class mismatch caused by the inline script below setting 'dark' before hydration.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/*
          Inline blocking script: Runs BEFORE React hydrates so there is no
          flash-of-wrong-theme. Reads saved preference from localStorage; if
          none found, defaults to dark mode.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var saved = localStorage.getItem('comfort_footwear_settings');
                  var theme = saved ? JSON.parse(saved).theme : 'dark';
                  if (theme === 'dark' || !theme) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="h-full flex flex-col overflow-hidden">{children}</body>
    </html>
  );
}
