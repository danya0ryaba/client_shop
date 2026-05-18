"use client";

import { ChangeEvent, useState } from "react";
import style from "./Counter.module.scss";

export const Counter = () => {
  const [value, setValue] = useState<number>(1);

  const dec = () => setValue((prev) => Math.max(1, prev - 1));

  const inc = () => setValue((prev) => prev + 1);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    if (!Number.isFinite(next)) return;
    setValue(Math.max(1, Math.trunc(next)));
  };

  return (
    <div className={style.counter}>
      <button onClick={dec} className={style.counter_btn}>
        -
      </button>
      <input
        type="number"
        className={style.counter_inp}
        value={value}
        min={1}
        step={1}
        onChange={onChange}
      />
      <button onClick={inc} className={style.counter_btn}>
        +
      </button>
    </div>
  );
};
