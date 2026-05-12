import { Form } from "@/components/shared/Form/Form";
import style from "./AuthPage.module.scss";

export default function AuthPage() {
  return (
    <div className={style.auth}>
      <Form />
    </div>
  );
}
