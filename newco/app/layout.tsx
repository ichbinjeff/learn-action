import type { Metadata } from "next";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Inter, Space_Grotesk } from 'next/font/google'
 
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const space_grotesk = Space_Grotesk({
  subsets: ['latin-ext'],
  display: 'swap',
  variable: '--font-space_grotesk',
})

export const metadata: Metadata = {
  title: "Articul8 | Solving the World’s Toughest Problems with Generative AI",
  description:
    "Articul8's full-stack GenAI platform helps accelerate digital transformation and unlock lasting business value by rapidly transforming proprietary data into actionable insights.",
  metadataBase: new URL('https://articul8.ai'),
  openGraph: {
    images: [
      {
        url: '/A8_link_preview.png',
        width: 300,
        height: 300,
      },
    ],
  }

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${space_grotesk.variable}`}>
      <body>{children}</body>
      <GoogleTagManager gtmId="GTM-PXRXGL6L" />
    </html>
  );
}
