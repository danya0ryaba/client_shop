import { SearchInput } from "@/components/ui/SearchIput";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/routers/routers";
import { useAppSelector } from "@/libs/hooks/useReduxHooks";
import { selectIsAuthenticated } from "@/store/slices/authSlice";
import { Logo } from "@/components/ui/Logo";

import style from "./Header.module.scss";

export const Header = () => {
  const isAuth = useAppSelector(selectIsAuthenticated);
  const name = useAppSelector((store) => store.auth.user);

  return (
    <header className={style.header}>
      <Logo />

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
          <Button icon={<User />} className={style.user}>
            {name?.fullName}
          </Button>
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
