import localFont from "next/font/local";
import "../styles/globals.css";

const archivo = localFont({
  src: "./fonts/archivo-var-latin.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

export const metadata = {
  metadataBase: new URL("https://manheim666.github.io"),
  title: "Asif Habilov · ML engineer, computer vision",
  description:
    "Asif Habilov builds computer vision, forecasting and data pipelines end to end. Projects, results and contact.",
  openGraph: {
    title: "Asif Habilov · ML engineer, computer vision",
    description: "Detection, tracking and forecasting projects with real metrics and live demos.",
    images: ["/assets/img/bee-honeybees-tracked.webp"],
  },
};

export const viewport = { themeColor: "#07090c", colorScheme: "dark" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('reduced')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
