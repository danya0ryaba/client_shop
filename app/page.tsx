import { CartProduct } from "@/components/shared/CartProduct/CartProduct";
import { Category } from "@/components/shared/Category/Category";
import { Header } from "@/components/shared/Header/Header";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SearchInput } from "@/components/ui/SearchIput";
import { Title } from "@/components/ui/Title";
import { User } from "lucide-react";
import { ShoppingCart } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      {/* <SearchInput name="search" placeholder="Поиск товаров..." /> */}

      {/* <Button theme={ButtonTheme.primary}>Войти</Button>
      <Button theme={ButtonTheme.secondary} big>
        Войти
      </Button>

      <Input text="Email" type="text" placeholder="example@mail.com" />

      <Input text="Password" type="text" placeholder="Введите пароль" />

      <Title as="h1">Заголовок h1</Title>
      <Title as="h2">Заголовок h2</Title>
      <Title as="h3">Заголовок h3</Title>
      <Title as="h4">Заголовок h4</Title>
      <Title as="h5">Заголовок h5</Title>
      <Title as="h6">Заголовок h6</Title> */}
      {/* <CartProduct /> */}
      <Category />
    </div>
  );
}
