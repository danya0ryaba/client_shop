"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import style from "./SliderProduct.module.scss";

const images = [
  "https://placehold.co/600x400",
  "https://placehold.co/600x400/ff0000/fff",
  "https://placehold.co/600x400/00ff00/000",
];

export const SliderProduct = () => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={style.wrapper__slider}>
      <div className={style.slider}>
        <div className={style.slider__main}>
          <button
            className={`${style.arrow} ${style.arrow_left}`}
            onClick={handlePrev}
          >
            <ArrowLeft className={style.svg} />
          </button>
          <img src={`${images[current]}`} alt="Photo product" />
          <button
            className={`${style.arrow} ${style.arrow_right}`}
            onClick={handleNext}
          >
            <ArrowRight />
          </button>
        </div>

        <div className={style.slider__other}>
          {images.map((img, i) => (
            <div
              key={img}
              className={style.slider__other_photo}
              style={{
                border: i === current ? "2px solid #076437" : "none",
                cursor: "pointer",
              }}
              onClick={() => setCurrent(i)}
            >
              <img
                src={img.replace("600x400", "180x120")}
                alt="Photo product"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
