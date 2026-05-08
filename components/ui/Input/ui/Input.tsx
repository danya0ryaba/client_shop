"use client";

import React, { useState } from "react";

import style from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  text: string;
  onCheckedInput?: (value: string) => boolean;
  width?: number;
  messageError?: string;
}

export const Input: React.FC<InputProps> = ({
  className,
  text,
  type = "text",
  placeholder,
  onCheckedInput,
  width = 376,
  messageError,
  ...props
}) => {
  const [value, setValueInput] = useState("");
  const [isError, setIsError] = useState(true);

  const classError = isError ? style.input__error : "";
  const htmlFor = text + placeholder; //unique value

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };

  return (
    <div className={style.wrapper_input}>
      <label htmlFor={htmlFor} className={style.label}>
        {text}
      </label>
      <div>
        <input
          id={htmlFor}
          placeholder={placeholder}
          className={`${style.input} ${classError}`}
          value={value}
          onChange={onChangeInput}
          {...props}
        />
      </div>
      {isError && <span className={style.error}>{messageError}</span>}
    </div>
  );
};
