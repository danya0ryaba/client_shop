import style from "./InputDescription.module.scss";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  text: string;
  onCheckedInput?: (value: string) => boolean;
  messageError?: string;
  error?: string;
}

export const InputDescription: React.FC<TextareaProps> = ({
  className,
  text,
  placeholder,
  onCheckedInput,
  messageError,
  error,
  ...props
}) => {
  const classError = error ? style.input__error : "";
  const htmlFor = text + (placeholder || ""); //unique value

  return (
    <div className={`${style.wrapper_input} ${className}`}>
      <label htmlFor={htmlFor} className={style.label}>
        {text}
      </label>
      <div>
        <textarea
          id={htmlFor}
          placeholder={placeholder}
          className={`${style.input} ${classError}`}
          {...props}
        ></textarea>
      </div>
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
};
