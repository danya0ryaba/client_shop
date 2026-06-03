"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import style from "./Checkbox.module.scss";

interface CheckboxProps {
  disabled?: boolean;
  label?: string;
  className?: string;
  id?: string;
  name?: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  disabled = false,
  label = "Товар в наличии",
  className = "",
  id,
  error,
  name,
}) => {
  const [activeCheckbox, setActiveCheckbox] = useState(false);

  const activeClass = activeCheckbox ? style.checkbox__active : "";

  return (
    <div className={`${style.wrapper__checkbox} ${className}`}>
      <div
        className={style.checkbox}
        onClick={() => setActiveCheckbox((prev) => !prev)}
      >
        <div className={`${style.checkbox__svg} ${activeClass}`}>
          {activeCheckbox && <Check className={style.svg} />}
        </div>
        <span className={style.text}>{label}</span>
      </div>
      {error && <span className={style.checkbox__error}>{error}</span>}
    </div>
  );
};
