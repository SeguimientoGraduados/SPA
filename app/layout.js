import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from '../app/context/AuthContext';
import './globals.css'; 

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
            rel="stylesheet"
          />
      </head>
      <body className={`${inter.className} bg-gray-200`}>
        <AuthProvider>
          <Header />
          <main className="flex-grow bg-gray-200">{children}</main>
          <Footer className="mb-0" />
        </AuthProvider>
      </body>
    </html>
  );
}
