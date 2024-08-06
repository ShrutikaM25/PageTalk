import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../config/theme/next-ui/providers";
import { AppProvider } from "@/state/appState";
import { ConfigProvider } from "antd";
import theme from "@/config/theme/ant-design/themeConfig";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PageTalk",
  description: "AI powered notes and much more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <AppProvider>
          <ConfigProvider theme={theme}>
            <Theme>
              <Providers>{children}</Providers>
            </Theme>
          </ConfigProvider>
        </AppProvider>
      </body>
    </html>
  );
}
