"use client";

import { Logo } from "@/components/ui/Logo";
import { Title } from "@/components/ui/Title";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/libs/hooks/useReduxHooks";
import { productsApi, useGetCategoriesQuery } from "@/libs/api";
import { ROUTES } from "@/routers/routers";
import { Camera, MessageCircleQuestionMark } from "lucide-react";
import { footer__info } from "@/libs/const/const";
import { setActiveCategory } from "@/store/slices/categorySlice";

import style from "./Footer.module.scss";

interface FooterI {
  className?: string;
}

export const Footer: React.FC<FooterI> = ({ className }) => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(
    (state) => productsApi.endpoints.getCategories.select()(state)?.data,
  );

  const onHandlerCategoryes = (category: string) => {
    dispatch(setActiveCategory(category));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className={`${style.footer} ${className}`}>
      <div className={style.footer__wrapper}>
        <div className={style.wrapper__nav}>
          <div className={style.wrapper__nav__item}>
            <nav className={style.nav}>
              <Title className={style.title}>Навигация</Title>
              <ul>
                <li>
                  <Link href={ROUTES.HOME}>Каталог</Link>
                </li>
                <li>
                  <Link href={ROUTES.ABOUT}>О нас</Link>
                </li>
                <li>
                  <Link href={ROUTES.CART}>Корзина</Link>
                </li>
                <li>
                  <Link href={""}>Личный кабинет</Link>
                </li>
                <li>
                  <Link href={ROUTES.ORDER}>Мои заказы</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className={style.wrapper__nav__item}>
            <nav className={style.nav}>
              <Title className={style.title}>Покупателям</Title>
              <ul>
                <li>
                  <Link href={ROUTES.HOME}>Доставка</Link>
                </li>
                <li>
                  <Link href={ROUTES.ABOUT}>Условия возврата товара</Link>
                </li>
                <li>
                  <Link href={ROUTES.ABOUT}>Пользовательское соглашение</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className={style.wrapper__nav__item}>
            <nav className={style.nav}>
              <Title className={style.title}>Категории</Title>
              <ul>
                {categories?.map((el) => (
                  <li key={el.id} onClick={() => onHandlerCategoryes(el.name)}>
                    <span>{el.name}</span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className={style.wrapper__nav__item}>
            <nav className={style.nav}>
              <Title className={style.title}>Контакты</Title>
              <ul className={style.ul}>
                {footer__info.map((el) => {
                  const Icon = el.icon;
                  return (
                    <li key={el.title} className={style.li}>
                      <div className={style.icon}>
                        <Icon className={style.icon__svg} />
                      </div>
                      <div className={style.info}>
                        <span className={style.info__title}>{el.title}</span>
                        <span className={style.info__desc}>{el.desc}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className={style.copi}>
        © 2026 Садовый урожай. Все права защищены.
      </div>
    </footer>
  );
};
