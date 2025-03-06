import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWarpper";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Get me a chai",
//   description: "A Fund project"
// };



export default function RootLayout({ children }) {
  return (
    <html lang="en">
  <body className="bg-slate-950 text-white">
    <SessionWrapper>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </SessionWrapper>
  </body>
</html>

  );
}
