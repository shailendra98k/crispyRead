import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { Suspense } from "react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crispy Read - where content meets clarity",
  description:
    "Experience a fresh approach to reading with Crispy Read! Our web app delivers articles in a concise, easy-to-digest format. Say goodbye to information overload and hello to a streamlined reading experience. Stay informed effortlessly with Crispy Read – where content meets clarity!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href="./favicon.ico" />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', "${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}");
        `}
      </Script>
      <Suspense
        fallback={
          <div style={{ postion: "absolute", top: "300px" }}>Loading...</div>
        }
      >
        <body className={inter.className}>
          <AuthProvider>
            <ThemeContextProvider>
              <ThemeProvider>
                <Navbar />
                <div className="container">
                  <div className="wrapper">{children}</div>
                </div>
                <Footer />
              </ThemeProvider>
            </ThemeContextProvider>
          </AuthProvider>
        </body>
      </Suspense>
    </html>
  );
}
