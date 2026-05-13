import { Leaf } from "lucide-react";
import { Title } from "@/components/ui/Title";
import { Input } from "@/components/ui/Input";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

import style from "./Form.module.scss";

export const FormRegister: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <article className={style.wrapper__form}>
        <Link href={"/"} className={style.link}>
          <MoveLeft className={style.link__svg} /> На главную
        </Link>
        <form className={style.form}>
          <div className={style.form__logo}>
            <Leaf className={style.form__logo_svg} />
          </div>
          <Title>Регистрация</Title>
          <span className={style.form__text}>Создайте аккаунт для покупок</span>
          <div className={style.form__inputs}>
            <Input text="Имя" type="text" placeholder="Введите ваше имя" />
            <Input text="Email" type="text" placeholder="example@mail.com" />
            <Input text="Пароль" type="password" placeholder="Введите пароль" />
            <Button big theme={ButtonTheme.secondary}>
              Войти
            </Button>
          </div>
          <Link href={""} className={style.form__link}>
            Уже есть аккаунта? Войти
          </Link>
        </form>
      </article>
    </div>
  );
};
