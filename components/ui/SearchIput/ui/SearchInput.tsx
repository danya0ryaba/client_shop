"use client";

import { Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { useSearchProductsByNameQuery } from "@/libs/api";
import { useDebounce } from "@/libs/hooks/useDebounce";
import { Product } from "@/libs/types/apiTypes";
import Link from "next/link";
import { ROUTES } from "@/routers/routers";

import style from "./SearchInput.module.scss";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const SearchInput: React.FC<InputProps> = ({ className, ...props }) => {
  const [value, setValueInput] = useState("");
  const [isOpenWindow, setIsOpenWindow] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedValue = useDebounce(value, 400);

  const searchTerm = debouncedValue.trim();

  const isEmpty = searchTerm.length === 0;
  const isTooShort = searchTerm.length > 0 && searchTerm.length < 2;

  const { currentData, isLoading, isFetching, isError } =
    useSearchProductsByNameQuery(searchTerm, {
      skip: isEmpty || isTooShort,
    });

  const products = currentData ?? [];

  const shouldShowDropdown =
    !isEmpty &&
    (isTooShort || isLoading || isFetching || isError || products.length > 0);

  const onClearInput = () => {
    setIsOpenWindow(false);
    setValueInput("");
    inputRef.current?.blur();
  };

  const onFocusHandler = () => {
    if (value.trim().length > 0) setIsOpenWindow(true);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setValueInput(next);
    if (next.trim().length > 0) setIsOpenWindow(true);
    if (next.trim().length === 0) setIsOpenWindow(false);
  };

  return (
    <div
      className={`${style.wrapper__input} ${className ?? ""}`}
      onBlur={(e) => {
        const next = e.relatedTarget as HTMLElement | null;
        if (next && e.currentTarget.contains(next)) return;
        setIsOpenWindow(false);
      }}
      tabIndex={-1}
    >
      <div className={style.wrapper__input_block}>
        <Search
          className={style.icon}
          onClick={() => inputRef.current?.focus()}
        />
        <input
          ref={inputRef}
          className={style.input}
          onFocus={onFocusHandler}
          type="text"
          value={value}
          onChange={onChangeInput}
          {...props}
        />
        {isOpenWindow && (
          <X
            className={style.cross}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClearInput();
            }}
            onClick={(e) => e.preventDefault()}
          />
        )}
        {/* СПИСОК */}
        {isOpenWindow && shouldShowDropdown && (
          <div className={style.options__wrapper} style={{ left: 0 }}>
            <div className={style.options}>
              {!isEmpty && isTooShort && <div>Введите минимум 2 символа</div>}
              {(isLoading || isFetching) && !isEmpty && !isTooShort && (
                <div>Поиск…</div>
              )}
              {isError && !isEmpty && !isTooShort && <div>Ошибка поиска</div>}

              {!isEmpty && !isTooShort && (
                <>
                  <ul className={style.options__options}>
                    {products.map((p: Product) => (
                      <li className={style.option} key={p.id}>
                        <Link
                          className={style.option__link}
                          href={ROUTES.PRODUCT(p.id)}
                        >
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {products.length === 0 && <div>Ничего не найдено</div>}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
