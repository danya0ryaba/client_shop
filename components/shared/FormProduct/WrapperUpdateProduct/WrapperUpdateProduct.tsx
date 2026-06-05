"use client";

import { useGetProductByIdQuery } from "@/libs/api";
import { useParams } from "next/navigation";
import { FormProductUpdate } from "../FormProductUpdate/FormProductUpdate";
import Link from "next/link";
import { ROUTES } from "@/routers/routers";
import { MoveLeft } from "lucide-react";

export const WrapperUpdateProduct = () => {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useGetProductByIdQuery(id);

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки</div>;
  if (!data) return null;

  return (
    <>
      <Link href={ROUTES.HOME}>
        <MoveLeft /> На главную
      </Link>
      <FormProductUpdate product={data} />
    </>
  );
};
