"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductImage } from "@/libs/types/apiTypes";
import Image from "next/image";

import style from "./SliderProduct.module.scss";

interface SliderProductI {
  images: ProductImage[];
}

export const SliderProduct: React.FC<SliderProductI> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL_IMAGES;

  const getVisibleThumbnails = () => {
    if (images.length <= 3) return images;

    let startIndex = current - 1;

    if (current === 0) {
      startIndex = 0;
    } else if (current === images.length - 1) {
      startIndex = images.length - 3;
    }

    return images.slice(startIndex, startIndex + 3);
  };

  const visibleImages = getVisibleThumbnails();

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

          <div className={style.slider__main_image}>
            <Image
              src={`${API_URL}${images[current].url}`}
              alt="Photo product"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className={style.slider__main_img}
              unoptimized
            />
          </div>

          <button
            className={`${style.arrow} ${style.arrow_right}`}
            onClick={handleNext}
          >
            <ArrowRight className={style.svg} />
          </button>
        </div>

        <div className={style.slider__other}>
          {visibleImages.map((img) => {
            const originalIndex = images.findIndex(
              (item) => item.id === img.id,
            );
            return (
              <div
                key={img.id}
                className={style.slider__other_photo}
                style={{
                  border:
                    originalIndex === current ? "2px solid #076437" : "none",
                  cursor: "pointer",
                }}
                onClick={() => setCurrent(originalIndex)}
              >
                <img src={`${API_URL}${img.url}`} alt={img.url} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
