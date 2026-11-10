import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ansh Pandey — Full Stack Developer",
  description:
    "Portfolio of Ansh Pandey, a 3rd-year B.Tech student and full-stack developer building web applications with React, TypeScript, PostgreSQL and exploring machine learning.",
  keywords: [
    "Ansh Pandey",
    "Full Stack Developer",
    "B.Tech Student",
    "React Developer",
    "TypeScript",
    "PostgreSQL",
    "Machine Learning",
    "New Delhi Developer",
    "Software Engineer Portfolio",
    "Sharda University",
  ],
  authors: [{ name: "Ansh Pandey" }],
  openGraph: {
    title: "Ansh Pandey — Full Stack Developer",
    description:
      "Portfolio of Ansh Pandey — B.Tech student building full-stack applications and exploring AI & machine learning.",
    siteName: "Ansh Pandey Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ansh Pandey — Full Stack Developer",
    description:
      "B.Tech student building full-stack applications with React, TypeScript & PostgreSQL.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased bg-[#040408] text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
