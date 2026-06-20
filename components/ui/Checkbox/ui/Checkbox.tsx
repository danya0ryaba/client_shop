"use client";

import { Check } from "lucide-react";

import style from "./Checkbox.module.scss";

interface CheckboxProps {
  disabled?: boolean;
  label?: string;
  className?: string;
  id?: string;
  name?: string;
  error?: string;
  value?: boolean;
  onChange?: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  disabled = false,
  label = "",
  className = "",
  id,
  value = false,
  error,
  name,
  onChange,
}) => {
  const activeClass = value ? style.checkbox__active : "";

  const handleClick = () => {
    if (disabled) return;
    onChange?.();
  };

  return (
    <div
      className={`${style.wrapper__checkbox} ${className}`}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div className={style.checkbox} onClick={handleClick}>
        <div className={`${style.checkbox__svg} ${activeClass}`}>
          {value && <Check className={style.svg} />}
        </div>
        {label && <span className={style.text}>{label}</span>}
      </div>
      {error && <span className={style.checkbox__error}>{error}</span>}
    </div>
  );
};
