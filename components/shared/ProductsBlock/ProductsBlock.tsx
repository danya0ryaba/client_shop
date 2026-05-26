"use client";

import React, { useEffect, useState } from "react";
import { CartProduct } from "../CartProduct/CartProduct";
import { Pagination } from "../Pagination/Pagination";
import {
  useGetProductQuery,
  useGetProductsByCategoryPaginatedQuery,
} from "@/libs/api";
import { Product, ProductWithCategory } from "@/libs/types/apiTypes";
import { PaginatedProductsResponse } from "@/libs/types/apiTypes";
import Link from "next/link";
import { ROUTES } from "@/routers/routers";

import style from "../../../app/products/Products.module.scss";

interface ProductsBlockProp {
  activeCategory: string;
}

export const ProductsBlock: React.FC<ProductsBlockProp> = ({
  activeCategory,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const isAll = activeCategory === "Все категории";

  const allQuery = useGetProductQuery(
    { page: currentPage, limit: pageSize },
    { skip: !isAll },
  );

  const categoryQuery = useGetProductsByCategoryPaginatedQuery(
    { categoryName: activeCategory, page: currentPage, limit: pageSize },
    { skip: isAll },
  );

  const data = isAll ? allQuery.data : categoryQuery.data;
  const isLoading = isAll ? allQuery.isLoading : categoryQuery.isLoading;
  const isError = isAll ? allQuery.isError : categoryQuery.isError;

  if (isLoading) return <div>Загрузка продуктов...</div>;
  if (isError || !data)
    return <div>Продукты не найдены или произошла ошибка</div>;

  // проверка, что data - это PaginatedProductsResponse
  const isPaginatedResponse = (obj: any): obj is PaginatedProductsResponse =>
    obj && typeof obj === "object" && "products" in obj && "totalCount" in obj;

  let products: ProductWithCategory[] = [];
  let totalCount = 0;

  if (isPaginatedResponse(data)) {
    products = data.products;
    totalCount = data.totalCount;
  } else if (Array.isArray(data)) {
    products = data;
    totalCount = data.length;
  }

  return (
    <>
      <div className={style.all__product}>Найдено товаров: {totalCount}</div>
      <div className={style.list__product}>
        {products.map((product: Product) => (
          <Link href={ROUTES.PRODUCT(product.id)} key={product.id}>
            <CartProduct {...product} />
          </Link>
        ))}
      </div>
      <div className={style.pagination}>
        {totalCount > pageSize && (
          <Pagination
            totalCount={totalCount}
            pageSize={pageSize}
            page={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};
