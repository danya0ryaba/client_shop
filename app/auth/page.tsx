"use client";

import { FormLogin } from "@/components/shared/Form/FormLogin";
import { FormRegister } from "@/components/shared/Form/FormRegister";

import style from "./AuthPage.module.scss";
import { useState } from "react";

export default function AuthPage() {
  const [auth, setAuth] = useState(false);

  const onChangeAuth = () => setAuth((prev) => !prev);

  return (
    <div className={style.auth}>
      {auth ? (
        <FormLogin changeAuth={onChangeAuth} />
      ) : (
        <FormRegister changeAuth={onChangeAuth} />
      )}
    </div>
  );
}
