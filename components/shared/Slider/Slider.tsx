"use client";

import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { slides } from "@/libs/const/const";

import style from "./Slider.module.scss";

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideTransform = {
    transform: `translateX(-${currentSlide * 100}%)`,
  };

  return (
    <div className={style.slider}>
      <div className={style.wrapper__slider}>
        <div
          className={`${style.button} ${style.button__left}`}
          role="button"
          onClick={prevSlide}
        >
          <ChevronLeft className={style.button__arrow} />
        </div>
        <div className={style.wrapper__slider_slider} style={slideTransform}>
          {slides.map((el) => (
            <div className={style.slide} key={el.id}>
              <div className={style.slide__image}>
                <img src={el.image} alt={el.title} />
                {/* <Image
                  src={el.image}
                  alt={el.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 1400px"
                  style={{ objectFit: "cover" }}
                  priority={el.id === 1}
                /> */}
              </div>
              <div className={style.slide__info}>
                <span className={style.slide__info_title}>{el.title}</span>
                <span className={style.slide__info_desc}>{el.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
        <div
          role="button"
          onClick={nextSlide}
          className={`${style.button} ${style.button__right}`}
        >
          <ChevronRight className={style.button__arrow} />
        </div>
        <div className={style.docs}>
          {slides.map((_, i) => (
            <div
              key={i}
              role="button"
              onClick={() => setCurrentSlide(i)}
              className={`
              ${style.docs__doc} 
              ${currentSlide === i && style.docs__doc_active}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
