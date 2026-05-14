import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Садовый урожай",
  description:
    "Продажа свежих овощей, грибов, ягод, закруток и трав. Натуральные продукты из г. Соликамск. Доставкой в другие города",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
