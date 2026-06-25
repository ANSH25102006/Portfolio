import type { Metadata } from "next";
import { JetBrains_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ansh Pandey | Full Stack Developer Portfolio",
  description: "B.Tech student and Full Stack Developer passionate about building scalable products with React, TypeScript, Node.js, and PostgreSQL.",
  keywords: [
    "Ansh Pandey",
    "Full Stack Developer",
    "B.Tech Student",
    "Delhi Developer",
    "React Developer Portfolio",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Ansh Pandey" }],
  openGraph: {
    title: "Ansh Pandey | Full Stack Developer",
    description: "Building modern web applications that solve real-world problems. Explore projects, technical skills, and certifications.",
    siteName: "Ansh Pandey Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${jetbrainsMono.variable} ${ibmPlexMono.variable} antialiased bg-[#050505] text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}

