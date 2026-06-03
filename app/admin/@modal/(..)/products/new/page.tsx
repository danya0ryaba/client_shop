import { RouteModal } from "@/components/ui/RouteModal";

export default function NewProductModalPage() {
  return (
    <RouteModal title="Добавить товар">
      {/* Тут твоя форма добавления */}
      <div>
        <p>Форма добавления товара</p>
        {/* Input'ы, селекты и т.д. */}
      </div>
    </RouteModal>
  );
}
