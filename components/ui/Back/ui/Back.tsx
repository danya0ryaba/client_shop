import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/routers/routers";

import style from "./Back.module.scss";

export const Back = () => {
  return (
    <Link href={ROUTES.HOME} className={style.wrapper__back}>
      <ArrowLeft /> Вернуться к покупкам
    </Link>
  );
};
