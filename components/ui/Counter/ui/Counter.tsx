"use client";

import { ChangeEvent, useState } from "react";

import style from "./Counter.module.scss";

interface CounterI {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  disabled?: boolean;
}

export const Counter: React.FC<CounterI> = ({
  value,
  onChange,
  min = 1,
  disabled,
}) => {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(value + 1);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    if (!Number.isFinite(next)) return;
    onChange(Math.max(min, Math.trunc(next)));
  };

  return (
    <div className={style.counter}>
      <button onClick={dec} className={style.counter_btn} disabled={disabled}>
        -
      </button>
      <input
        // type="number"
        // className={style.counter_inp}
        // value={value}
        // min={1}
        // step={1}
        // onChange={onChange}
        type="number"
        className={style.counter_inp}
        value={value}
        min={min}
        step={1}
        onChange={handleChange}
        disabled={disabled}
      />
      <button onClick={inc} className={style.counter_btn} disabled={disabled}>
        +
      </button>
    </div>
  );
};
