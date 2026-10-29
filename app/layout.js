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
  metadataBase: new URL("https://manheim666.github.io/asifhabilov/"),
  title: "Asif Habilov · ML engineer, computer vision",
  description:
    "Asif Habilov builds computer vision, forecasting and data pipelines end to end. Projects, results and contact.",
  openGraph: {
    title: "Asif Habilov · ML engineer, computer vision",
    description: "Detection, tracking and forecasting projects with real metrics and live demos.",
    images: ["/assets/img/bee-honeybees-tracked.webp"],
  },
};

export const viewport = { themeColor: "#07090c", colorScheme: "dark light" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "(function(){var d=document.documentElement;d.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('reduced');var t;try{t=localStorage.getItem('theme')}catch(e){}if(!t)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';d.setAttribute('data-theme',t);document.addEventListener('click',function(e){if(!e.target.closest('[data-theme-toggle]'))return;var n=d.getAttribute('data-theme')==='light'?'dark':'light';d.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(x){}})})()" }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
