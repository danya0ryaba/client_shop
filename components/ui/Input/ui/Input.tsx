import React, { useState } from 'react'

import style from './Input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    text: string;
    onCheckedInput?: (value: string) => boolean;
    width?: number;
    messageError?: string;
}

export const Input:React.FC<InputProps> = ({
     className,
    text,
    type = 'text',
    placeholder,
    onCheckedInput,
    width = 376,
    messageError,
    ...props
}) => {
     const [isError, setIsError] = useState(false);
      const classError = isError ? style.input__error : '';
    const htmlFor = text + placeholder; //unique value
  return (
    <div>
        <label htmlFor=""></label>

        <div>
        <input type="text" />
        </div>
         {isError && <span className={style.error}>{messageError}</span>}
    </div>
  )
}
