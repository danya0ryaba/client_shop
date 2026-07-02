import Link from "next/link";
import { Title } from "../../Title";
import { ROUTES } from "@/routers/routers";
import { Leaf } from "lucide-react";

import style from "./Logo.module.scss";

interface LogoI {
  className?: string;
}

export const Logo: React.FC<LogoI> = ({ className }) => {
  return (
    <Link href={ROUTES.HOME} className={`${style.logo} ${className}`}>
      <div className={style.logo__image}>
        <Leaf className={style.logo__image_svg} />
      </div>
      <div className={style.logo__text}>
        <Title as="h5" color="green" className={style.logo__text_title}>
          Садовый урожай
        </Title>
        <span>Свежие овощи и ягоды</span>
      </div>
    </Link>
  );
};
