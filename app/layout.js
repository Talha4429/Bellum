import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";
import { CartProvider } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { ensureAssetsSynced } from "@/lib/asset-sync";

export const metadata = {
  title: "Bellum | Architecture & Bespoke Furniture Studio",
  description:
    "Bespoke architectural and interior solutions rooted in minimal design and high-end tactility. Designed in Lahore.",
};

export default function RootLayout({ children }) {
  ensureAssetsSynced();
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.cdnfonts.com/css/champagne-limousines"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/didot"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=GFS+Didot&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-[#F7F5F1] text-[#111111] antialiased min-h-screen flex flex-col selection:bg-ink selection:text-ivory">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <PageTransition>{children}</PageTransition>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}