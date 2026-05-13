import { FormLogin } from "@/components/shared/Form/FormLogin";
import { FormRegister } from "@/components/shared/Form/FormRegister";

import style from "./AuthPage.module.scss";

export default function AuthPage() {
  return (
    <div className={style.auth}>
      <FormLogin />
      {/* <FormRegister /> */}
    </div>
  );
}
