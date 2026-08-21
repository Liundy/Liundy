import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A股看盘台",
  description: "个人 A 股交易看盘界面 V1",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
