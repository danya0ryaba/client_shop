"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import {
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

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
  revertMs?: number;
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
  onClick,
  revertMs = 1200,
  ...otherProps
}) => {
  const [iconView, setIconView] = useState<React.ReactNode>(icon);

  const timerRef = useRef<number | null>(null);
  const prevIconRef = useRef<React.ReactNode>(icon);

  useEffect(() => {
    if (timerRef.current === null) {
      setIconView(icon);
    }
  }, [icon]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const showTempIcon = () => {
    if (!iconOnly) {
      return;
    }

    prevIconRef.current = icon;

    setIconView(<Check />);

    if (timerRef.current !== null) clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      setIconView(prevIconRef.current);
      timerRef.current = null;
    }, revertMs);
  };

  const classBigBtn = big ? style.big__btn : "";
  const classDisabled = otherProps.disabled ? style.disabled : "";
  const themaBtn = active ? ButtonTheme.secondary : theme;

  const iconNode = iconView;

  if (link) {
    const { type, ...anchorProps } =
      otherProps as AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <div className={`${className} ${style.wrapper_button}`}>
        <Link
          href={link}
          onClick={(e) => {
            showTempIcon();
            (onClick as any)?.(e);
          }}
          className={`${style.button} ${style[themaBtn]} ${classBigBtn}`}
          {...anchorProps}
        >
          {!!iconNode && !iconOnly && (
            <span className={style.icon}>{iconNode}</span>
          )}
          {!!iconNode && iconOnly && (
            <span className={`${style.icon} ${style.icon__only}`}>
              {iconNode}
            </span>
          )}
          {children}
        </Link>
      </div>
    );
  }

  return (
    <div className={`${className} ${style.wrapper_button}`}>
      <button
        onClick={(e) => {
          showTempIcon();
          onClick?.(e);
        }}
        className={`${style.button} ${style[themaBtn]} ${classBigBtn} ${classDisabled}`}
        {...otherProps}
      >
        {!!iconNode && !iconOnly && (
          <span className={style.icon}>{iconNode}</span>
        )}
        {!!iconNode && iconOnly && (
          <span className={`${style.icon} ${style.icon__only}`}>
            {iconNode}
          </span>
        )}
        {children}
      </button>
    </div>
  );
};
