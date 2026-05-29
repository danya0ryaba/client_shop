"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/routers/routers";
import { Title } from "@/components/ui/Title";
import { WrapperCard } from "@/components/shared/Cart/WrapperCard/WrapperCard";

import style from "./Cart.module.scss";

export default function Cart() {
  return (
    <div className={style.wrapper}>
      <Link href={ROUTES.HOME} className={style.wrapper__back}>
        <ArrowLeft /> Вернуться к покупкам
      </Link>
      <Title as="h1" className={style.wrapper__title}>
        Корзина
      </Title>
      <WrapperCard />
    </div>
  );
}
