import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/HeaderComponent";
import Footer from "./components/Footer/FooterComponent";
import { AuthProvider } from '../app/context/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
