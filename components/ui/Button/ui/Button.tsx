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
}

export const Button: FC<ButtonProps> = ({
  className = "",
  theme = ButtonTheme.primary,
  children,
  icon,
  iconOnly,
  ...otherProps
}) => {
  return (
    <div className={`${className} ${style.wrapper_button}`}>
      <button className={`${style.Button} ${style[theme]}`} {...otherProps}>
        {icon && !iconOnly && <span className={style.icon}>{icon}</span>}
        {icon && iconOnly && (
          <span className={`${style.icon} ${style.icon__only}`}>{icon}</span>
        )}
        {children}
      </button>
    </div>
  );
};
