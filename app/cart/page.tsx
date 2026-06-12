"use client";

import { Title } from "@/components/ui/Title";
import { WrapperCard } from "@/components/shared/Cart/WrapperCard/WrapperCard";
import { Back } from "@/components/ui/Back";

import style from "./Cart.module.scss";

export default function Cart() {
  return (
    <div className={style.wrapper}>
      <Back />
      <Title as="h1" className={style.wrapper__title}>
        Корзина
      </Title>
      <WrapperCard />
    </div>
  );
}
