import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";

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
  link?: string;
}

export const Button: React.FC<ButtonProps> = ({
  className = "",
  theme = ButtonTheme.primary,
  children,
  icon,
  iconOnly = false,
  big,
  active = false,
  link,
  ...otherProps
}) => {
  const classBigBtn = big ? style.big__btn : "";
  const classDisabled = otherProps.disabled ? style.disabled : "";
  const themaBtn = active ? ButtonTheme.secondary : theme;

  if (link) {
    const {
      type,
      // disabled,
      ...anchorProps
    } = otherProps as AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <div className={`${className} ${style.wrapper_button}`}>
        <Link
          href={link}
          className={`${style.button} ${style[themaBtn]} ${classBigBtn}`}
          // {...anchorProps}
        >
          {icon && !iconOnly && <span className={style.icon}>{icon}</span>}
          {icon && iconOnly && (
            <span className={`${style.icon} ${style.icon__only}`}>{icon}</span>
          )}
          {children}
        </Link>
      </div>
    );
  }

  return (
    <div className={`${className} ${style.wrapper_button}`}>
      <button
        className={`${style.button} ${style[themaBtn]} ${classBigBtn} ${classDisabled}`}
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
