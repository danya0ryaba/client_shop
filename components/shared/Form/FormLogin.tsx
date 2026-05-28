import { Leaf } from "lucide-react";
import { Title } from "@/components/ui/Title";
import { Input } from "@/components/ui/Input";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { FormI } from "./FormRegister";
import { ROUTES } from "@/routers/routers";
import { useForm } from "react-hook-form";
import { formSchemaLogin } from "@/libs/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import style from "./Form.module.scss";
import { useLoginMutation } from "@/libs/api";

type FormState = {
  email: string;
  password: string;
};

export const FormLogin: React.FC<FormI> = ({ changeAuth }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormState>({
    resolver: zodResolver(formSchemaLogin),
    mode: "onChange",
  });

  const [loginUser, { isLoading, error, isSuccess }] = useLoginMutation();

  const onSubmit = async (data: FormState) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };
      const res = await loginUser(payload).unwrap();
      console.log("LOGIN OK:", res);
      ROUTES.HOME;
    } catch (error) {
      console.log(data);
      reset();
    }
  };

  return (
    <div className={style.wrapper}>
      <article className={style.wrapper__form}>
        <Link href={ROUTES.HOME} className={style.link}>
          <MoveLeft className={style.link__svg} /> На главную
        </Link>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.form__logo}>
            <Leaf className={style.form__logo_svg} />
          </div>
          <Title>Вход в аккаунт</Title>
          <span className={style.form__text}>
            Войдите, чтобы продолжить покупки
          </span>
          <div className={style.form__inputs}>
            <Input
              {...register("email")}
              text="Email"
              type="text"
              placeholder="example@mail.com"
              error={errors.email?.message}
            />
            <Input
              {...register("password")}
              text="Пароль"
              type="password"
              placeholder="Введите пароль"
              error={errors.password?.message}
            />
            <Button
              big
              type="submit"
              disabled={!isValid}
              theme={ButtonTheme.secondary}
            >
              Войти
            </Button>
          </div>
          <button onClick={changeAuth} className={style.form__link}>
            Нет аккаунта? Зарегистрироваться
          </button>
        </form>
      </article>
    </div>
  );
};
