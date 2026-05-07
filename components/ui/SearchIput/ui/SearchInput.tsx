import { Search } from "lucide-react";
import style from "./SearchInput.module.scss";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
}

export const SearchInput: React.FC<InputProps> = ({ ...props }) => {
  return (
    <div className={style.wrapper__input}>
      <Search className={style.icon} />
      <input type="text" className={style.input} {...props} />
    </div>
  );
};
