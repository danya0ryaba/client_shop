import { ROUTES } from "@/routers/routers";
import Link from "next/link";
import { CartProduct } from "../CartProduct/CartProduct";
import { useGetProductQuery, useGetProductsByCategoryQuery } from "@/libs/api";

const products = Array.from({ length: 12 });

interface ProductsBlockProp {
  activeCategory: string;
}
export const ProductsBlock: React.FC<ProductsBlockProp> = ({
  activeCategory,
}) => {
  const {
    data: allProducts,
    isLoading: loadingAll,
    isError: errorAll,
  } = useGetProductQuery(undefined, {
    skip: activeCategory !== "Все категории",
  });

  const {
    data: filteredProducts,
    isLoading: loadingFiltered,
    isError: errorFiltered,
  } = useGetProductsByCategoryQuery(activeCategory, {
    skip: activeCategory === "Все категории",
  });

  const data =
    activeCategory === "Все категории" ? allProducts : filteredProducts;
  const isLoading =
    activeCategory === "Все категории" ? loadingAll : loadingFiltered;
  const isError = activeCategory === "Все категории" ? errorAll : errorFiltered;

  if (isLoading) return <div>Загрузка продуктов...</div>;
  if (isError || !data)
    return <div>Продукты не найдены или произошла ошибка</div>;
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
