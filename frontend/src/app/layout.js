import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AddressProvider } from "./context/AddressContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import "./globals.css";
import { Inter } from "next/font/google";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://vangmaya.in"),
  title: {
    default: "VANGMAYA – Shop Online at Best Prices",
    template: "%s | VANGMAYA",
  },
  description:
    "VANGMAYA is an online shopping destination offering a wide range of quality products at the best prices. Discover great deals and shop smart.",
  keywords: [
    "Vangmaya",
    "online shopping",
    "ecommerce website",
    "buy products online",
    "best deals online",
    "shop online India",
  ],
  openGraph: {
    title: "VANGMAYA - Shop Online at Best Prices",
    description:
      "Shop a wide range of products online at the best prices on VANGMAYA.",
    url: "https://vangmaya.in",
    siteName: "VANGMAYA",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VANGMAYA",
    description:
      "Shop a wide range of products online at the best prices.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider >
          <CartProvider>
            <AddressProvider >
              <WishlistProvider>
                <Navbar />
                  {children}
                <Footer />
              </WishlistProvider>
            </AddressProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
