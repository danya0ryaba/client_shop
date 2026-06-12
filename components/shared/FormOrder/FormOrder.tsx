import { User } from "lucide-react";
import { Title } from "@/components/ui/Title";
import { Input } from "@/components/ui/Input";
import { InputDescription } from "@/components/ui/InputDescription";

import style from "./FormOrder.module.scss";

interface FormOrderI {
  className?: string;
}

export const FormOrder: React.FC<FormOrderI> = ({ className }) => {
  return (
    <form className={`${style.form} ${className}`}>
      <div className={style.title}>
        <User className={style.title__svg} />
        <Title as="h4">Контактные данные</Title>
      </div>

      <div className={style.info__user}>
        <Input text="Имя *" className={style.info__user_input} />
        <Input text="Телефон *" className={style.info__user_input} type="tel" />
      </div>

      <div className="email">
        <Input text="E-mail (необязательно)" type="email" />
      </div>

      <InputDescription
        text="Комментарий к заказу"
        placeholder="Например, позвоните за 30мин до доставки"
      />
    </form>
  );
};
