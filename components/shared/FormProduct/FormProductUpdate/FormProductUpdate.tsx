import { Input } from "@/components/ui/Input";
import { Button, ButtonTheme } from "@/components/ui/Button";
import { InputDescription } from "@/components/ui/InputDescription";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";

import style from "./FormProductUpdate.module.scss";

export const FormProductUpdate = () => {
  const options = ["11", "12", "13", "14", "15"];

  return (
    <div>
      <form action="" className={style.form}>
        <Input text="Название товара" />
        <div className={style.form__desc}>
          <Select text="Марка" options={options} />
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
