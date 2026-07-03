import { Phone, Mail, MapPin, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const footer__info: { title: string; desc: string; icon: LucideIcon }[] =
  [
    { title: "+7 (900) 123-45-67", desc: "Основной номер", icon: Phone },
    { title: "info@example.com", desc: "Электронная почта", icon: Mail },
    { title: "Москва, ул. Ленина, 1", desc: "Наш адрес", icon: MapPin },
    { title: "Пн–Пт 9:00–18:00", desc: "Время работы", icon: Clock },
  ];

export const slides = [
  {
    id: 1,
    image: "https://placehold.co/1400x440",
    title: "Свежие овощи из нашего сада",
    subtitle: "Выращено с любовью и заботой о природе",
  },
  {
    id: 2,
    image: "https://placehold.co/1400x440",
    title: "100% органическое земледелие",
    subtitle: "Никаких химикатов, только натуральный уход",
  },
  {
    id: 3,
    image: "https://placehold.co/1400x440",
    title: "Сладкие ягоды прямо с грядки",
    subtitle: "Собираем каждое утро для максимальной свежести",
  },
  {
    id: 4,
    image: "https://placehold.co/1400x440",
    title: "Круглогодичное выращивание",
    subtitle: "Свежий урожай в любое время года",
  },
];
