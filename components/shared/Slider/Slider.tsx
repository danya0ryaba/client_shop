import { Title } from "@/components/ui/Title";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

import style from "./Slider.module.scss";

export const Slider = () => {
  return (
    <div className={style.slider}>
      <div className={style.wrapper__slider}>
        
        <div className={`${style.button} ${style.button__left}`} role="button">
          <ChevronLeft className={style.button__arrow}/>
        </div>
       
        <div className={style.slide}>
          <div className={style.slide__image}>
            {/* <img src="https://placehold.co/1400x440" alt="slide" /> */}
            <img src="/images/orig.webp" alt="slide" />
          </div>
          <div className={style.slide__info}>
            <span className={style.slide__info_title}>Свежие овощи из нашего сада</span>
            <span className={style.slide__info_desc}>Выращено с любовью и заботой о природе</span>
          </div>
        </div>
         
         <div className={`${style.button} ${style.button__right}`} role="button">
          <ChevronRight className={style.button__arrow}/>
        </div>

        {/* добавить active slide */}
        <div className={style.docs}>
          <div className={style.docs__doc} role="button"/>
          <div className={style.docs__doc} role="button"/>
          <div className={style.docs__doc} role="button"/>
          <div className={style.docs__doc} role="button"/>
        </div>
       
      </div>
    </div>
  );
};
