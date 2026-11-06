import { Chivo, Chivo_Mono } from "next/font/google";
import "../styles/site.css";

const chivo = Chivo({ subsets: ["latin"], variable: "--font-chivo", display: "swap" });
const mono = Chivo_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata = {
  metadataBase: new URL("https://manheim666.github.io/asifhabilov/"),
  title: "Asif Habilov, machine learning engineer",
  description:
    "Computer vision and forecasting projects by Asif Habilov in Baku. Drag a real model's confidence threshold and see what it finds.",
  openGraph: {
    title: "Asif Habilov, machine learning engineer",
    description: "Computer vision and forecasting projects with real model output you can drag around.",
    images: ["/assets/og.jpg"],
  },
};

export const viewport = { themeColor: "#e8e8e3" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${chivo.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
