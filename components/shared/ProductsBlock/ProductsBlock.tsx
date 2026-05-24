import { ROUTES } from "@/routers/routers";
import Link from "next/link";
import { CartProduct } from "../CartProduct/CartProduct";
import { useGetProductQuery } from "@/libs/api";

const products = Array.from({ length: 12 });

export const ProductsBlock = () => {
  const { data, isError, isLoading } = useGetProductQuery();

  if (isLoading) return <div>Загрузка продукта...</div>;
  if (isError || !data) {
    return <div>Продукт не найден или произошла ошибка</div>;
  }
  console.log(data);
  return (
    <>
      {data?.map((product) => (
        <Link href={ROUTES.PRODUCT(product.id)} key={product.id}>
          <CartProduct {...product} />
        </Link>
      ))}
    </>
  );
};
