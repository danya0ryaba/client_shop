import { Title } from "@/components/ui/Title";
import style from "./Category.module.scss";
import { Button } from "@/components/ui/Button";

export const Category = () => {
  return (
    <div className={style.category}>
      <Title as="h4">Категории</Title>
      <div className={style.categoryes}>
        <Button active>Все категории</Button>
        <Button>Овощи</Button>
        <Button>Ягоды</Button>
        <Button>Зелень</Button>
      </div>
    </div>
  );
};
