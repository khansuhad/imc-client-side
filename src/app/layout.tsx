
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "../app/components/NavBar"
import NextAuthSessionProvider from "../providers/NextAuthSessionProvider"
import StoreProvider from "../redux/StoreProvider"
import Footer from "./components/Footer"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Infinity Math Center",
  description: "Infinity Math Center is a premier educational institute dedicated to providing top-quality math tutoring and coaching. Our expert instructors help students excel in mathematics through personalized learning, interactive problem-solving, and advanced test preparation. Whether you're preparing for academic exams, competitive tests, or simply looking to strengthen your math skills, we ensure a supportive and effective learning environment.",
  keywords:["Infinity Math Center", "math tutoring", "math coaching", "mathematics institute", "math learning", "test preparation", "math education", "advanced math", "problem-solving", "math training", "math center"],
  openGraph: {
    title: "Infinity Math Center ",
    description: "Infinity Math Center is a premier educational institute dedicated to providing top-quality math tutoring and coaching. Our expert instructors help students excel in mathematics through personalized learning, interactive problem-solving, and advanced test preparation. Whether you're preparing for academic exams, competitive tests, or simply looking to strengthen your math skills, we ensure a supportive and effective learning environment.",
    url: "https://infinitymathcenter.com",
    siteName: "Infinity Math Center",
    type: "website",
    images: [
      {
        url: "/assets/images/Logo.webp",
        width: 1200,
        height: 630,
      },]}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)


{
  
  return (
    <html lang="en" >
      <head>
      <meta name="viewport" content="width=300, initial-scale=1, maximum-scale=1, user-scalable=no"/>
      </head>
     <NextAuthSessionProvider>
      <StoreProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-white `}
      >
       <div className="min-h-screen">
       <div  className={` 2xl:px-[300px] `}>
       <NavBar></NavBar>
       </div>
     <div  className={`  `}>
     {children}
     </div>
     <Footer/>
       </div>
      </body>
      </StoreProvider>
    
     </NextAuthSessionProvider>
    </html>
  );
}
