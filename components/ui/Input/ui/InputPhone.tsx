"use client";

import { useController, Control, FieldValues, Path } from "react-hook-form";
import { IMaskInput } from "react-imask";

import style from "./Input.module.scss";

interface InputPhoneProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  text: string;
  className?: string;
  error?: string;
}

export const InputPhone = <T extends FieldValues>({
  name,
  control,
  text,
  className,
  error,
}: InputPhoneProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  return (
    <div className={`${style.wrapper_input} ${className || ""}`}>
      <label className={style.label}>{text}</label>
      <div>
        <IMaskInput
          mask="+{7} (000) 000-00-00"
          value={value || ""}
          unmask={false}
          onAccept={(value) => onChange(value)}
          placeholder="+7 (___) ___-__-__"
          className={`${style.input} ${error ? style.input__error : ""}`}
        />
      </div>
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
};
