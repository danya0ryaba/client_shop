"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import style from "./Select.module.scss";

interface CustomSelectProps {
  className?: string;
  options: string[];
  text: string;
  error?: string;
}

export const Select: React.FC<CustomSelectProps> = ({
  className = "",
  options,
  text,
  error,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const htmlFor = text + inputValue;

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setIsOpen(false);
  };

  const onBlurHandler = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 90);
  };

  return (
    <div className={`${style.wrapper} ${className}`}>
      <label htmlFor={htmlFor} className={style.label}>
        {text}
      </label>
      <div className={style.CustomSelect} onBlur={onBlurHandler}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Выбрать"
          className={style.input}
          onFocus={() => setIsOpen(true)}
          id={htmlFor}
        />
        <span className={style.arrowWrapper} onClick={() => setIsOpen(!isOpen)}>
          <ChevronDown
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0)",
              transition: "0.3s ease",
            }}
          />
        </span>
        {isOpen && filteredOptions.length > 0 && (
          <ul className={style.options}>
            {filteredOptions.map((option, index) => (
              <li
                key={option + index}
                onMouseDown={() => handleOptionClick(option)}
                className={style.option}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
