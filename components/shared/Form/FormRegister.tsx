import { Leaf } from "lucide-react";
import { Title } from "@/components/ui/Title";
import { Input } from "@/components/ui/Input";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/routers/routers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemaRegister } from "@/libs/schema";
import { useRegisterMutation } from "@/libs/api";
import { toast } from "react-toastify";
// import { redirect } from "next/navigation";

import style from "./Form.module.scss";

type FormState = {
  name: string;
  email: string;
  password: string;
};

export interface FormI {
  changeAuth: () => void;
}

export const FormRegister: React.FC<FormI> = ({ changeAuth }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormState>({
    resolver: zodResolver(formSchemaRegister),
    mode: "onChange",
  });

  const [registerUser, { isLoading, error, isSuccess }] = useRegisterMutation();

  const onSubmit = async (data: FormState) => {
    try {
      const payload = {
        fullName: data.name,
        email: data.email,
        password: data.password,
      };
      const res = await registerUser(payload).unwrap();
      console.log("REGISTER OK:", res);
      reset();
      toast.success("Письмо отправлено на указанную почту", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // redirect(ROUTES.HOME);
    } catch (err) {
      const errorMessage =
        (err as { data?: { message: string } }).data?.message ||
        "Ошибка регистрации. Пожалуйста, попробуйте снова.";
      toast.error(errorMessage, {
        autoClose: 5000,
        hideProgressBar: false,
      });
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
          <Title>Регистрация</Title>
          <span className={style.form__text}>Создайте аккаунт для покупок</span>
          <div className={style.form__inputs}>
            <Input
              text="Имя"
              type="text"
              placeholder="Введите ваше имя"
              {...register("name")}
              error={errors.name?.message}
            />
            <Input
              text="Email"
              type="text"
              placeholder="example@mail.com"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              text="Пароль"
              type="password"
              placeholder="Введите пароль"
              {...register("password")}
              error={errors.password?.message}
            />
            <Button
              disabled={!isValid || isLoading}
              type="submit"
              big
              theme={ButtonTheme.secondary}
            >
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </div>
          <button onClick={changeAuth} className={style.form__link}>
            Уже есть аккаунта? Войти
          </button>
        </form>
      </article>
    </div>
  );
};
