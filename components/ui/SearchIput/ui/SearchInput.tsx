"use client";

import { Search } from "lucide-react";
import { X } from "lucide-react";
import { useRef, useState } from "react";

import style from "./SearchInput.module.scss";
import { useSearchProductsByNameQuery } from "@/libs/api";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const array_product = ["1", "2", "3", "4", "5", "6"];

export const SearchInput: React.FC<InputProps> = ({ className, ...props }) => {
  const [value, setValueInput] = useState("");
  const [isOpenWindow, setIsOpenWindow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // const { data, isError, isLoading } = useSearchProductsByNameQuery(value);
  // console.log(data);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };
  const onHandlerOptionClick = (option: string) => {
    setValueInput(option);
    setIsOpenWindow(false);
  };

  const onHandlerSearche = (value: string) => {
    console.log(value);
  };

  const onClearInput = () => {
    setIsOpenWindow(false);
    setValueInput("");
    inputRef.current?.blur();
  };

  const handleCrossMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClearInput();
  };

  const onHandlerBlur = () => {
    setTimeout(() => {
      setIsOpenWindow(false);
    }, 0);
  };

  return (
    <div className={`${style.wrapper__input} ${className}`}>
      <div className={style.wrapper__input_block}>
        <Search
          className={style.icon}
          onClick={() => onHandlerSearche(value)}
        />
        <input
          ref={inputRef}
          className={style.input}
          onFocus={() => setIsOpenWindow(true)}
          onBlur={onHandlerBlur}
          type="text"
          value={value}
          onChange={onChangeInput}
          {...props}
        />
        {isOpenWindow && (
          <X
            className={style.cross}
            onMouseDown={handleCrossMouseDown}
            onClick={(e) => e.preventDefault()}
          />
        )}
        {/* LIST */}
        {isOpenWindow && (
          <div className={style.options__wrapper} style={{ left: 0 }}>
            <div className={style.options}>
              <ul className={style.options__options}>
                {array_product.map((option, index) => (
                  <li
                    className={style.option}
                    key={option + index}
                    onMouseDown={() => onHandlerOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
