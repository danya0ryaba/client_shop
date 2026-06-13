import { Back } from "@/components/ui/Back";
import { Title } from "@/components/ui/Title";
import { FormOrder } from "@/components/shared/FormOrder/FormOrder";
import { FormObtaining } from "@/components/shared/FormOrder/FormObtaining/FormObtaining";
import { TotalOrder } from "@/components/shared/FormOrder/TotalOrder/TotalOrder";

import style from "./order.module.scss";

export default function OrderPage() {
  return (
    <>
      <div className={style.wrapper}>
        <Back />
        <Title>Оформление заказа</Title>
      </div>
      <div className={style.wrapper__info}>
        <div className={style.wrapper__info_form}>
          <FormOrder />
          <FormObtaining />
        </div>
        <div className={style.wrapper__info_total}>
          <TotalOrder />
        </div>
      </div>
    </>
  );
}
