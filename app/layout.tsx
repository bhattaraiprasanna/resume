import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"; 
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prasanna Bhattarai - Frontend Developer",
  description:
    "Professional CV of Prasanna Bhattarai, a Frontend Developer with expertise in React.js, HTML, CSS, and JavaScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        > 
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
