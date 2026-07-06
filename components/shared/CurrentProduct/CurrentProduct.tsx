"use client";

import { Check, Leaf, ShoppingCart, Truck, Shield } from "lucide-react";
import { Title } from "@/components/ui/Title";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { SliderProduct } from "@/components/ui/SliderProduct";
import { useAddToCartMutation, useGetProductByIdQuery } from "@/libs/api";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import style from "./CurrentProduct.module.scss";

export const CurrentProduct = () => {
  const params = useParams();
  const id = params.id as string;

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(id, {
    skip: !id,
  });

  console.log(product?.deliveryToCities);

  const [addToCart, { isLoading: loading }] = useAddToCartMutation();

  const onClickButton = async () => {
    try {
      await addToCart({ productId: id, quantity: 1 }).unwrap();
      toast.success("Добавлено в корзину");
    } catch (err) {
      const errorMessage = (err as { data?: { message: string } }).data
        ?.message;
      toast.error(`${errorMessage}`);
    }
  };

  if (isLoading) return <div>Загрузка продукта...</div>;
  if (isError || !product)
    return <div>Продукт не найден или произошла ошибка</div>;

  const delivery = product.deliveryToCities;

  const icons = [
    { name: "Органика", icon: <Leaf className={style.svg} /> },
    {
      name: delivery
        ? "Доставка в другие города"
        : "Нет доставки в другие города",
      icon: (
        <Truck className={style.svg} style={{ opacity: delivery ? 1 : 0.45 }} />
      ),
    },
    { name: "Гарантия качества", icon: <Shield className={style.svg} /> },
  ];

  return (
    <div className={style.wrapper__product}>
      <div className={style.slider}>
        <div className={style.slider__slider}>
          <SliderProduct images={product.images} />
        </div>
        <div className={style.slider__icons}>
          {icons.map((el, i) => (
            <div className={style.icon} key={el.name + i}>
              <div className={style.icon__svg}>{el.icon}</div>
              <span className={style.icon__text}>{el.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={style.info}>
        <span className={style.info__category}>{product.category?.name}</span>
        <Title as="h2">{product.name}</Title>
        <span className={style.info__text}>{product.description}</span>
        <div className={style.info__price}>
          <div>
            <span className={style.info__price_value}>{product.price} ₽</span>
            <span className={style.info__price_scope}>{product.size}/ кг</span>
          </div>
          <div className={style.stock}>
            <Check /> <span>В наличии {product?.quantityProduct} штук</span>
          </div>
        </div>
        <Button
          disabled={product?.quantityProduct === 0}
          onClick={onClickButton}
          active
          className={style.info__btn}
          theme={ButtonTheme.secondary}
          big
          iconOnly
          icon={<ShoppingCart />}
        >
          {product?.quantityProduct > 0
            ? "Добавить в корзину"
            : "товара нет в наличии"}
        </Button>
        <div className={style.about__product}>
          <span>О продукте</span>
          <ul>
            <li>
              <span>
                Выращено на собственном участке без использования химических
                удобрений
              </span>
            </li>
            <li>
              <span>Собрано в день отправки для максимальной свежести</span>
            </li>
            <li>
              <span>Экологически чистый продукт с сертификацией</span>
            </li>
            <li>
              <span>Идеально для здорового питания всей семьи</span>
            </li>
          </ul>
        </div>
        <div className={`${style.about__product} ${style.about__product_last}`}>
          {delivery ? (
            <>
              <span>Доставки</span>
              <ul>
                <li>
                  <span>Почта РОССИИ</span>
                </li>
                <li>
                  <span>Пункт выдачи СДЭК</span>
                </li>
                <li>
                  <span>Доставка OZON</span>
                </li>
              </ul>
              <span className={style.delivery}>
                Узнать подробнее можно на страницы оформления заказа
              </span>
            </>
          ) : (
            <Title as="h5">Доставка в другие города отсутствует</Title>
          )}
        </div>
      </div>
    </div>
  );
};
