import { ROUTES } from "@/routers/routers";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { FormProductCreate } from "../FormProductCreate/FormProductCreate";

export const WrapperCreateProduct = () => {
  return (
    <>
      <Link href={ROUTES.HOME}>
        <MoveLeft /> На главную
      </Link>
      <FormProductCreate />
    </>
  );
};
