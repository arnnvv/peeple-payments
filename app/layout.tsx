import "./globals.css";
import type { Metadata } from "next";
import { type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import Script from "next/script";



export const metadata: Metadata = {
  title: "Peeple",
  description: "Connect. Match. Love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body

      >
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />
        <Providers>
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}