import { CartProduct } from "@/components/shared/CartProduct/CartProduct";
import { Category } from "@/components/shared/Category/Category";
import { Header } from "@/components/shared/Header/Header";
import { Slider } from "@/components/shared/Slider/Slider";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SearchInput } from "@/components/ui/SearchIput";
import { Title } from "@/components/ui/Title";
import { User } from "lucide-react";
import { ShoppingCart } from "lucide-react";

const products = Array.from({ length: 12 });

export default function Home() {
  return (
    <div>
      <Slider />
      <Category />
      <main>
        <div className="info_category">
          <Title as="h4">Все товары</Title>
          <span>Найдено товаров: 12</span>
        </div>
        <CartProduct />
        <CartProduct />
        {/* <div className="product"> */}
        {/* {products.map((el, i) => (
            <CartProduct key={i} />
          ))} */}
        {/* </div> */}
      </main>
    </div>
  );
}
