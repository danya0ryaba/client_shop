import { ROUTES } from "@/routers/routers";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { FormProductCreate } from "../FormProductCreate/FormProductCreate";
import { Title } from "@/components/ui/Title";

export const WrapperCreateProduct = () => {
  return (
    <>
      <Link href={ROUTES.HOME}>
        <MoveLeft /> На главную
      </Link>
      <Title as="h2">Создать новый товар</Title>
      <FormProductCreate />
    </>
  );
};
