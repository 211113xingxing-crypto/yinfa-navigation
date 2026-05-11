import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "银发指南 - 养老服务与丧葬信息平台",
  description: "帮您一站式查询全国养老院、殡仪馆、墓地信息。为父母养老解难，为家人善后分忧。",
  keywords: "养老院,养老机构,殡仪馆,墓地,公墓,陵园,养老服务,丧葬服务,白事,养老导航",
  openGraph: {
    title: "银发指南 - 养老服务与丧葬信息平台",
    description: "帮您一站式查询全国养老院、殡仪馆、墓地信息",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
