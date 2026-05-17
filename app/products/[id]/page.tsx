import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { ROUTES } from "@/routers/routers";
import { CurrentProduct } from "@/components/shared/CurrentProduct/CurrentProduct";
import { OtherProduct } from "@/components/shared/OtherProduct/OtherProduct";

import style from "./Product.module.scss";

export default function Product() {
  return (
    <>
      <div className={style.product}>
        <Link href={ROUTES.HOME} className={style.product__back} type="button">
          <MoveLeft className={style.product__back_svg} />
          <span className={style.product__back_text}>Вернуться к покупкам</span>
        </Link>
      </div>
      <CurrentProduct />
      <OtherProduct />
    </>
  );
}
