"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import style from "./Select.module.scss";

// нужно переписывать

interface CustomSelectProps {
  className?: string;
  options: string[];
  text: string;
  error?: string;

  // для RHF/Controller
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export const Select: React.FC<CustomSelectProps> = ({
  className = "",
  options,
  text,
  error,
  name,
  value = "",
  onChange,
  onBlur,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const htmlFor = `${name ?? text}`;

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase()),
      ),
    [options, value],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    onChange?.(option);
    setIsOpen(false);
  };

  const onBlurHandler = () => {
    onBlur?.();
    setTimeout(() => setIsOpen(false), 90);
  };

  return (
    <div className={`${style.wrapper} ${className}`}>
      <label htmlFor={htmlFor} className={style.label}>
        {text}
      </label>

      <div className={style.CustomSelect} onBlur={onBlurHandler}>
        <input
          id={htmlFor}
          name={name}
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="Выбрать"
          className={style.input}
          onFocus={() => setIsOpen(true)}
          autoComplete="off"
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
            {options.map((option, index) => (
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

      {error && <div className={style.error}>{error}</div>}
    </div>
  );
};
