import { FormProductUpdate } from "@/components/shared/FormProduct/FormProductUpdate/FormProductUpdate";
import { RouteModal } from "@/components/ui/RouteModal";

export default async function EditProductModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <RouteModal title={`Редактировать товар #${id}`}>
      {/* Тут форма редактирования */}
      <div>
        <p>Форма редактирования товара</p>
        <p>ID: {id}</p>
        <FormProductUpdate />
      </div>
    </RouteModal>
  );
}
