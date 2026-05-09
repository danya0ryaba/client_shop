import type { ButtonHTMLAttributes, FC } from "react";

import style from "./Button.module.scss";

export enum ButtonTheme {
  primary = "primary",
  secondary = "secondary",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  icon?: React.ReactNode;
  iconOnly?: boolean;
  big?: boolean;
  active?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className = "",
  theme = ButtonTheme.primary,
  children,
  icon,
  iconOnly = false,
  big,
  active = false,
  ...otherProps
}) => {
  const classBigBtn = big ? style.big__btn : "";

  const themaBtn = active ? ButtonTheme.secondary : theme;

  return (
    <div className={`${className} ${style.wrapper_button}`}>
      <button
        className={`${style.button} ${style[themaBtn]} ${classBigBtn}`}
        {...otherProps}
      >
        {icon && !iconOnly && <span className={style.icon}>{icon}</span>}
        {icon && iconOnly && (
          <span className={`${style.icon} ${style.icon__only}`}>{icon}</span>
        )}
        {children}
      </button>
    </div>
  );
};
