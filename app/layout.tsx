import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Header } from "@/components/shared/Header/Header";
import { Suspense } from "react";
import { Title } from "@/components/ui/Title";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import "../styles/global.scss";
import { ClientProvider } from "./ClientProvider";

const roboto = Roboto({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["cyrillic"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Садовый урожай",
  description:
    "Продажа свежих овощей, грибов, ягод и закруток ао г. Соликамск, а также с лоставкой в другие города",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={roboto.variable}>
      <body>
        <Suspense fallback={<Title> Загрузка...</Title>}>
          <Header />
        </Suspense>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
