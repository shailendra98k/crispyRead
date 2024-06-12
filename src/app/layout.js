import Navbar from "@/app/components/navbar/Navbar";
import "./globals.css";
import Footer from "@/app/components/footer/Footer";
import Script from "next/script";

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
      <Script id="ms-clarity" strategy="lazyOnload">
        {`
        
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY}");
        `}
      </Script>
      <body>
        <Navbar />
        <div className="container">
          <div className="wrapper">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
