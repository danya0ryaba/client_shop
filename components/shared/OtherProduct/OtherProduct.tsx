// "use client";

// import Link from "next/link";
// import { ROUTES } from "@/routers/routers";
// import { Title } from "@/components/ui/Title";
// import { CartProduct } from "../CartProduct/CartProduct";
// import { useGetProductsByCategoryQuery } from "@/libs/api";

// import style from "./OtherProduct.module.scss";

// export const OtherProduct = () => {
//   const {
//     data: products,
//     isError,
//     isLoading,
//   } = useGetProductsByCategoryQuery("цветы");

//   if (isLoading) return <div>Загрузка продуктов...</div>;
//   if (isError) return <div>Произошла ошибка при загрузке</div>;
//   if (!products || products.length === 0)
//     return <div>В категории "Овощи" пока нет товаров</div>;

//   return (
//     <div className={style.wrapper__other}>
//       <Title as="h3" className={style.wrapper__other_title}>
//         Похожие товары
//       </Title>
//       <div className={style.other}>
//         <div className={style.other__slider}>
//           {products.map((product, i) => (
//             <Link href={ROUTES.PRODUCT(product.id)} key={product.id}>
//               <CartProduct {...product} className={style.product} />
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import Link from "next/link";
import { ROUTES } from "@/routers/routers";
import { Title } from "@/components/ui/Title";
import { CartProduct } from "../CartProduct/CartProduct";
import {
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
} from "@/libs/api";
import { useParams } from "next/navigation";

import style from "./OtherProduct.module.scss";

export const OtherProduct = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: currentProduct } = useGetProductByIdQuery(id, {
    skip: !id,
  });

  const categoryName = currentProduct?.category?.name;

  const {
    data: products,
    isError,
    isLoading,
  } = useGetProductsByCategoryQuery(categoryName as string, {
    skip: !categoryName,
  });

  if (isLoading) return <div>Загрузка похожих товаров...</div>;
  if (isError) return <div>Произошла ошибка при загрузке</div>;
  if (!products || products.length === 0) return null;

  const filteredProducts = products.filter(
    (product) => String(product.id) !== id,
  );

  if (filteredProducts.length === 0) return null;

  return (
    <div className={style.wrapper__other}>
      <Title as="h3" className={style.wrapper__other_title}>
        Похожие товары
      </Title>
      <div className={style.other}>
        <div className={style.other__slider}>
          {filteredProducts.map((product) => (
            <Link href={ROUTES.PRODUCT(product.id)} key={product.id}>
              <CartProduct {...product} className={style.product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
