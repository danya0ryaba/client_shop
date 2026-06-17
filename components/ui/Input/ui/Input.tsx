// "use client";

// import style from "./Input.module.scss";

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   className?: string;
//   text: string;
//   onCheckedInput?: (value: string) => boolean;
//   // width?: number;
//   messageError?: string;
//   error?: string;
// }

// export const Input: React.FC<InputProps> = ({
//   className,
//   text,
//   type = "text",
//   placeholder,
//   onCheckedInput,
//   messageError,
//   error,
//   ...props
// }) => {
//   const classError = error ? style.input__error : "";
//   const htmlFor = text + (placeholder || ""); //unique value

//   return (
//     <div className={`${style.wrapper_input} ${className}`}>
//       <label htmlFor={htmlFor} className={style.label}>
//         {text}
//       </label>
//       <div>
//         <input
//           id={htmlFor}
//           placeholder={placeholder}
//           className={`${style.input} ${classError}`}
//           {...props}
//         />
//       </div>
//       {error && <span className={style.error}>{error}</span>}
//     </div>
//   );
// };

"use client";

import React from "react";
import style from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  text: string;
  onCheckedInput?: (value: string) => boolean;
  messageError?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, text, type = "text", placeholder, error, ...props }, ref) => {
    const classError = error ? style.input__error : "";
    const htmlFor = text + (placeholder || "");

    return (
      <div className={`${style.wrapper_input} ${className || ""}`}>
        <label htmlFor={htmlFor} className={style.label}>
          {text}
        </label>
        <div>
          <input
            ref={ref}
            id={htmlFor}
            placeholder={placeholder}
            className={`${style.input} ${classError}`}
            type={type}
            {...props}
          />
        </div>
        {error && <span className={style.error}>{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
