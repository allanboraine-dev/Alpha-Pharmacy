import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PWARegister } from "@/components/pwa-register";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#1E5631",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Alpha Pharm Script Uploader",
  description: "Secure and convenient script uploading for Alpha Pharm patients.",
  manifest: "/manifest-patient.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Alpha Pharm",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider defaultTheme="system">
          {children}
          <PWARegister />
        </ThemeProvider>
      </body>
    </html>
  );
}
