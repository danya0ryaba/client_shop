import { Input } from "@/components/ui/Input";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { InputDescription } from "@/components/ui/InputDescription";
import { Checkbox } from "@/components/ui/Checkbox";

import style from "./FormProductUpdate.module.scss";

export const FormProductUpdate = () => {
  return (
    <div>
      <form action="" className={style.form}>
        <Input text="Название товара" />
        {/* Тут, наверное, сделать еще selectInput для "Категория"*/}
        <div className={style.form__desc}>
          <Input text="Категория" className={style.form__desc_item} />
          <Input text="Цена (₽)" className={style.form__desc_item} />
          <Input text="Единица измерения" className={style.form__desc_item} />
        </div>
        <Input text="URL изображения" />
        <InputDescription text="Описание" />
        <div>
          <Checkbox label="Товар в наличии" />
        </div>
        <div className={style.form__buttons}>
          <Button
            type="submit"
            theme={ButtonTheme.secondary}
            active
            big
            className={style.form__buttons_btn}
          >
            Сохранить изменения
          </Button>
          <Button className={style.form__buttons_btn} big>
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};
