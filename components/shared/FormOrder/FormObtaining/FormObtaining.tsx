"use client";

import { House, Truck, CreditCard, BanknoteArrowDown } from "lucide-react";
import { Title } from "@/components/ui/Title";
import dynamic from "next/dynamic";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useState, useCallback } from "react";
import { booleanPointInPolygon, point, polygon } from "@turf/turf";
import { DaDataAddress, DaDataSuggestion } from "react-dadata";

const AddressInput = dynamic(
  () => import("@/components/ui/AddressInput").then((mod) => mod.AddressInput),
  { ssr: false },
);

const DeliveryMap = dynamic(
  () => import("../DeliveryMap/DeliveryMap").then((mod) => mod.DeliveryMap),
  { ssr: false },
);

import { OrderFormValues } from "@/libs/schema";

import style from "./FormObtaining.module.scss";

const DELIVERY_ZONE_COORDINATES: [number, number][] = [
  [59.6514603, 56.7682886],
  [59.6804818, 56.7945099],
  [59.6787486, 56.8099594],
  [59.673375, 56.8053246],
  [59.6736784, 56.7990589],
  [59.651959, 56.8016338],
  [59.6428943, 56.7879009],
  [59.6378187, 56.779232],
  [59.6381224, 56.7745972],
  [59.6404217, 56.7744255],
  [59.6409856, 56.7698765],
  [59.6390335, 56.7660141],
  [59.6444559, 56.7564869],
  [59.648186, 56.7655849],
  [59.6514603, 56.7682886],
];

const zonePolygon = polygon([
  DELIVERY_ZONE_COORDINATES.map(([lat, lng]) => [lng, lat]),
]);

export const FormObtaining = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<OrderFormValues>();

  const delivery = useWatch({ control, name: "delivery" });

  const [marker, setMarker] = useState<[number, number] | null>(null);
  const [deliveryError, setDeliveryError] = useState<string>("");

  const handleAddressChange = async (
    data?: DaDataSuggestion<DaDataAddress>,
  ) => {
    if (!data?.data) {
      setMarker(null);
      setDeliveryError("");
      setValue("address", data as any, { shouldValidate: true });
      return;
    }

    const lat = Number(data.data.geo_lat);
    const lon = Number(data.data.geo_lon);

    if (!lat || !lon) {
      setMarker(null);
      setDeliveryError("Не удалось определить координаты адреса");
      return;
    }

    const inside = booleanPointInPolygon(point([lon, lat]), zonePolygon);

    setMarker([lat, lon]);
    setValue("address", data, { shouldValidate: true });

    if (!inside) {
      setDeliveryError("По этому адресу доставки нет");
    } else {
      setDeliveryError("");
    }
  };

  const handleMapClick = useCallback(
    async (coords: [number, number], insideZone: boolean) => {
      setMarker(coords);

      if (!insideZone) {
        setDeliveryError("Туда доставки нет");
        setValue("address", null as any, { shouldValidate: true });
        return;
      }

      setDeliveryError("");

      try {
        const res = await fetch(
          `/api/reverse-geocode?lat=${coords[0]}&lon=${coords[1]}`,
        );
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        const formattedAddress = data.address;
        setValue("address", formattedAddress, { shouldValidate: true });
      } catch (error) {
        console.error("Ошибка при получении адреса:", error);
        setDeliveryError("Не удалось получить адрес");
      }
    },
    [setValue],
  );

  return (
    <div className={style.form__obtaining}>
      <div className={style.title}>
        <Truck className={style.title__svg} />
        <Title as="h4">Способ получения</Title>
      </div>

      <Controller
        name="delivery"
        control={control}
        render={({ field }) => (
          <div className={style.choice}>
            <div
              className={`${style.choice__item} ${field.value === "courier" ? style.choice__item_active : ""}`}
              onClick={() => field.onChange("courier")}
            >
              <Truck className={style.svg} />
              <span className={style.title}>Доставка курьером</span>
              <span className={style.desc}>
                Бесплатно при заказе от 200р, иначе +300р
              </span>
            </div>
            <div
              className={`${style.choice__item} ${field.value === "pickup" ? style.choice__item_active : ""}`}
              onClick={() => field.onChange("pickup")}
            >
              <House className={style.svg} />
              <span className={style.title}>Самовывоз</span>
              <span className={style.desc}>Бесплатно ул.Кузнецова 7А</span>
            </div>
          </div>
        )}
      />
      {errors.delivery?.message && (
        <span className={style.error}>{errors.delivery.message}</span>
      )}

      <div className={style.title}>
        <CreditCard className={style.title__svg} />
        <Title as="h4">Способ оплаты</Title>
      </div>

      <Controller
        name="payment"
        control={control}
        render={({ field }) => (
          <div className={style.choice}>
            <div
              className={`${style.choice__item} ${field.value === "cash" ? style.choice__item_active : ""}`}
              onClick={() => field.onChange("cash")}
            >
              <BanknoteArrowDown className={style.svg} />
              <span className={style.title}>Наличными</span>
              <span className={style.desc}>При получении заказа</span>
            </div>
            <div
              className={`${style.choice__item} ${field.value === "cart" ? style.choice__item_active : ""}`}
              onClick={() => field.onChange("cart")}
            >
              <CreditCard className={style.svg} />
              <span className={style.title}>Картой</span>
            </div>
          </div>
        )}
      />
      {errors.payment?.message && (
        <span style={{ color: "red" }}>{errors.payment.message}</span>
      )}

      {delivery === "courier" && (
        <>
          <label htmlFor="address" className={style.address}>
            Адрес
          </label>

          <div style={{ position: "relative", zIndex: 10000 }}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <AddressInput
                  value={field.value as any}
                  onChange={(value) => handleAddressChange(value)}
                />
              )}
            />
          </div>

          {errors.address?.message && (
            <span className={style.error}>{errors.address.message}</span>
          )}
          {deliveryError && (
            <span className={style.error}>{deliveryError}</span>
          )}

          <DeliveryMap marker={marker} onMapClick={handleMapClick} />

          <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
            * Доставка осуществляется только в выделенной зеленой зоне (г.
            Соликамск)
          </p>
        </>
      )}
    </div>
  );
};
