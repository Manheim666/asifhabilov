import { Inter, Saira } from "next/font/google";
import "../styles/site.css";

const display = Saira({ subsets: ["latin"], axes: ["wdth"], variable: "--font-display", display: "swap" });
const text = Inter({ subsets: ["latin"], variable: "--font-text", display: "swap" });

export const metadata = {
  metadataBase: new URL("https://manheim666.github.io/asifhabilov/"),
  title: "Asif Habilov: computer vision and machine learning projects",
  description:
    "Computer vision and forecasting projects by Asif Habilov in Baku. Drag a real model's confidence threshold and see what it finds.",
  openGraph: {
    title: "Asif Habilov: computer vision and machine learning projects",
    description: "Computer vision and forecasting projects with real model output you can drag around.",
    images: ["/assets/og.jpg"],
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c10" },
  ],
};

// Runs before first paint so a saved choice never flashes the other theme. With nothing saved, CSS follows the system.
const themeScript = `try{var t=localStorage.getItem("theme:v1");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
