import { Title } from "@/components/ui/Title";
import { Leaf, Heart, UsersRound, CircleStar } from "lucide-react";

import style from "./AboutPage.module.scss";

export default function AboutPage() {
  return (
    <div className={style.about}>
      <Title as="h1">О нашем саде</Title>
      <div className={style.about__desc}>
        Семейное хозяйство с любовью к природе и заботой о качестве
      </div>

      <div className={style.about__video}>ТУТ БУДЕТ ВИДЕО</div>

      <div className={style.about__wrapper_videos}>
        <div className={style.text}>
          <Title as="h3" className={style.text__title}>
            Наша история
          </Title>
          <p>
            Более 15 лет наша семья занимается выращиванием экологически чистых
            овощей и ягод. Всё началось с небольшого участка и желания питаться
            здоровой, натуральной пищей.
          </p>
          <p>
            Сегодня наш сад расширился до 5 гектаров плодородной земли, где мы
            выращиваем более 50 видов овощей, зелени и ягод. Мы гордимся тем,
            что не используем химические удобрения и пестициды.
          </p>
          <p>
            Каждое утро мы собираем свежий урожай и доставляем его нашим
            клиентам в тот же день. Ваше здоровье и доверие — наша главная
            награда.
          </p>
        </div>

        <div className={style.videos_files}>
          <div className={style.video}></div>
          <div className={style.video}></div>
          <div className={style.video}></div>
          <div className={style.video}></div>
        </div>
      </div>

      <Title as="h3" className={style.title_second}>
        Почему выбирают нас
      </Title>

      <div className={style.wrapper__info}>
        <div className={style.info}>
          <div className={style.info__image}>
            <Leaf className={style.info__image_svg} />
          </div>
          <Title as="h5" className={style.info__title}>
            100% Органика
          </Title>
          <span className={style.info__desc}>
            Никаких химикатов, только натуральные удобрения
          </span>
        </div>

        <div className={style.info}>
          <div className={style.info__image}>
            <Heart className={style.info__image_svg} />
          </div>
          <Title as="h5" className={style.info__title}>
            С любовью
          </Title>
          <span className={style.info__desc}>
            Каждое растение получает внимание и заботу
          </span>
        </div>

        <div className={style.info}>
          <div className={style.info__image}>
            <UsersRound className={style.info__image_svg} />
          </div>
          <Title as="h5" className={style.info__title}>
            Семейный бизнес
          </Title>
          <span className={style.info__desc}>
            Традиции и опыт передаются из поколения в поколение
          </span>
        </div>

        <div className={style.info}>
          <div className={style.info__image}>
            <CircleStar className={style.info__image_svg} />
          </div>
          <Title as="h5" className={style.info__title}>
            Качество
          </Title>
          <span className={style.info__desc}>
            Строгий контроль на всех этапах выращивания
          </span>
        </div>
      </div>

      <div className={style.contacts}>ТУТ БУДУТ КОНТАКТЫ</div>
    </div>
  );
}
