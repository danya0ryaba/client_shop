"use client";

import React from "react";

import style from "./InputDescription.module.scss";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  text: string;
  onCheckedInput?: (value: string) => boolean;
  messageError?: string;
  error?: string;
}

export const InputDescription = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, text, placeholder, error, ...props }, ref) => {
  const classError = error ? style.input__error : "";
  const htmlFor = text + (placeholder || "");

  return (
    <div className={`${style.wrapper_input} ${className || ""}`}>
      <label htmlFor={htmlFor} className={style.label}>
        {text}
      </label>
      <div>
        <textarea
          ref={ref}
          id={htmlFor}
          placeholder={placeholder}
          className={`${style.input} ${classError}`}
          {...props}
        />
      </div>
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
});

InputDescription.displayName = "InputDescription";
