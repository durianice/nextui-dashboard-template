import "@/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Panel",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={clsx("font-sans antialiased", fontSans.className)}>
        <NextTopLoader color="#7828C8" showSpinner={false} shadow={false} zIndex={9999} />
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
