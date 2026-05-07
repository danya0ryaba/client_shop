import { Button, ButtonTheme } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchIput";
import { User } from "lucide-react";
import { ShoppingCart } from "lucide-react";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      {/* <Button theme={ButtonTheme.primary} icon={<User />}>
        Войти
      </Button>
      <Button theme={ButtonTheme.primary}>Войти</Button>
      <Button theme={ButtonTheme.secondary} icon={<ShoppingCart />}>
        Корзина
      </Button>
      <Button theme={ButtonTheme.secondary}>Корзина</Button>
      <Button theme={ButtonTheme.secondary}>Все товары</Button>
      <Button theme={ButtonTheme.secondary} icon={<ShoppingCart />} iconOnly /> */}
      <SearchInput name="search" placeholder="Поиск товаров..." />
    </div>
  );
}
