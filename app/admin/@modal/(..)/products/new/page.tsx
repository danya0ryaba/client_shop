import { FormProductUpdate } from "@/components/shared/FormProduct/FormProductUpdate/FormProductUpdate";
import { RouteModal } from "@/components/ui/RouteModal";

export default function NewProductModalPage() {
  return (
    <RouteModal title="Добавить товар">
      <div>
        <p>Форма добавления товара</p>
        <FormProductUpdate product={null} />
      </div>
    </RouteModal>
  );
}
