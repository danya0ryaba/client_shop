import { SearchInput } from "@/components/ui/SearchIput";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { ShoppingCart, User, Leaf } from "lucide-react";
import { Title } from "@/components/ui/Title";
import Link from "next/link";

import style from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={style.header}>
      <Link href={""} className={style.logo}>
        <div className={style.logo__image}>
          <Leaf className={style.logo__image_svg} />
        </div>
        <div className={style.logo__text}>
          <Title as="h5" color="green">
            Садовый урожай
          </Title>
          <span>Свежие овощи и ягоды</span>
        </div>
      </Link>

      <nav className={style.menu}>
        <ul>
          <li>
            <Link href="/">Каталог</Link>
          </li>
          <li>
            <Link href="/">О нас</Link>
          </li>
        </ul>
      </nav>

      <SearchInput
        className={style.search__input}
        id="search"
        name="search_input"
      />

      <div className={style.buttons}>
        <Button icon={<User />}>Войти</Button>
        <Button icon={<ShoppingCart />} theme={ButtonTheme.secondary}>
          Корзина
        </Button>
      </div>
    </header>
  );
};
