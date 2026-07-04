"use client";

import { Logo } from "@/components/ui/Logo";
import { Title } from "@/components/ui/Title";
import Link from "next/link";
import { useAppSelector } from "@/libs/hooks/useReduxHooks";
import { productsApi } from "@/libs/api";
import { ROUTES } from "@/routers/routers";
import { Camera, MessageCircleQuestionMark } from "lucide-react";
import { footer__info } from "@/libs/const/const";

import style from "./Footer.module.scss";

// Проблема с навигацей в целом(чет придумать)

interface FooterI {
  className?: string;
}

export const Footer: React.FC<FooterI> = ({ className }) => {
  const categories = useAppSelector(
    (state) => productsApi.endpoints.getCategories.select()(state)?.data,
  );

  const onHandlerCategoryes = (categories: string) => {
    alert(categories);
  };

  return (
    <footer className={`${style.footer} ${className}`}>
      <div className={style.footer__wrapper}>
        <div className={style.footer__wrapper__item}>
          <div className={style.info}>
            <Logo className={style.info__logo} />
            <span>
              Продаём всё, что вырастили сами — без химии и посредников. Прямо с
              грядки к вашему столу.
            </span>
            <div className={style.icons}>
              <Link href={""} className={style.icons__icon}>
                <Camera className={style.icons__icon_svg} />
              </Link>
              <Link href={""} className={style.icons__icon}>
                <MessageCircleQuestionMark className={style.icons__icon_svg} />
              </Link>
            </div>
          </div>
        </div>
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
                  {/* сначала написать личный кабинет */}
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
