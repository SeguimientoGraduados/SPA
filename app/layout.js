import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/HeaderComponent";
import Footer from "./components/Footer/FooterComponent"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
