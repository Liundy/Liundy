import type { Metadata } from "next";
import "./globals.css";
import "./sentiment-extra.css";
import "./limit-ladder.css";
import SentimentExtras from "./SentimentExtras";
import LadderPortal from "./LadderPortal";

export const metadata: Metadata = {
  title: "A股看盘台",
  description: "个人 A 股交易看盘界面",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}<SentimentExtras /><LadderPortal /></body>
    </html>
  );
}
