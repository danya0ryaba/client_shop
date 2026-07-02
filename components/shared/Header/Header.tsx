import { SearchInput } from "@/components/ui/SearchIput";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { ShoppingCart, User, Leaf } from "lucide-react";
import { Title } from "@/components/ui/Title";
import Link from "next/link";
import { ROUTES } from "@/routers/routers";
import { useAppSelector } from "@/libs/hooks/useReduxHooks";
import { selectIsAuthenticated } from "@/store/slices/authSlice";

import style from "./Header.module.scss";

export const Header = () => {
  const isAuth = useAppSelector(selectIsAuthenticated);
  const name = useAppSelector((store) => store.auth.user);

  return (
    <header className={style.header}>
      <Link href={ROUTES.HOME} className={style.logo}>
        <div className={style.logo__image}>
          <Leaf className={style.logo__image_svg} />
        </div>
        <div className={style.logo__text}>
          <Title as="h5" color="green" className={style.logo__text_title}>
            Садовый урожай
          </Title>
          <span>Свежие овощи и ягоды</span>
        </div>
      </Link>

      <nav className={style.menu}>
        <ul>
          <li>
            <Link href={ROUTES.HOME}>Каталог</Link>
          </li>
          <li>
            <Link href={ROUTES.ABOUT}>О нас</Link>
          </li>
        </ul>
      </nav>

      <SearchInput
        className={style.search__input}
        id="search"
        name="search_input"
      />

      <div className={style.buttons}>
        {isAuth ? (
          <Button icon={<User />}>{name?.fullName}</Button>
        ) : (
          <Button icon={<User />} link={ROUTES.AUTH}>
            Войти
          </Button>
        )}
        <Button
          icon={<ShoppingCart />}
          theme={ButtonTheme.secondary}
          link={ROUTES.CART}
        >
          Корзина
        </Button>
      </div>
    </header>
  );
};
