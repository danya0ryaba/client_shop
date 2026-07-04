"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import style from "./Select.module.scss";

export interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  className?: string;
  options: string[] | SelectOption[];
  text: string;
  error?: string;
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

  const [inputValue, setInputValue] = useState("");

  const htmlFor = `${name ?? text}`;

  const normalizedOptions = useMemo(() => {
    return options.map((opt) => {
      if (typeof opt === "string") {
        return { label: opt, value: opt };
      }
      return opt;
    });
  }, [options]);

  useEffect(() => {
    const selectedOpt = normalizedOptions.find((opt) => opt.value === value);
    setInputValue(selectedOpt?.label || "");
  }, [value, normalizedOptions]);

  const filteredOptions = useMemo(
    () =>
      normalizedOptions.filter((opt) =>
        opt.label.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    [normalizedOptions, inputValue],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setIsOpen(true);
    const currentLabel = normalizedOptions.find(
      (opt) => opt.value === value,
    )?.label;
    if (val !== currentLabel) {
      onChange?.("");
    }
  };

  const handleOptionClick = (option: SelectOption) => {
    onChange?.(option.value);
    setInputValue(option.label);
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
          value={inputValue}
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
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                onMouseDown={() => handleOptionClick(option)}
                className={style.option}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <div className={style.error}>{error}</div>}
    </div>
  );
};
