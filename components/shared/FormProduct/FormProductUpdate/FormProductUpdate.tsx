import { Input } from "@/components/ui/Input";
import style from "./FormProductUpdate.module.scss";
import { Button, ButtonTheme } from "@/components/ui/Button";

export const FormProductUpdate = () => {
  return (
    <div>
      <form action="" className={style.form}>
        <Input text="Название товара" />
        <Input text="Цена (₽)" />
        {/* Тут, наверное, сделать еще selectInput*/}
        <Input text="Категория" />
        <Input text="Единица измерения" />
        <Input text="URL изображения" />
        <Input text="Описание" />
        {/* еще сделать radiobutton */}
        <div>Товар в наличии(сделать radiobutton)</div>
        <div className={style.form__buttons}>
          <Button theme={ButtonTheme.secondary} active big>
            Сохранить изменения
          </Button>
          <Button>Отмена</Button>
        </div>
      </form>
    </div>
  );
};
