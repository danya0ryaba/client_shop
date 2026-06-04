import { FormProductUpdate } from "@/components/shared/FormProduct/FormProductUpdate/FormProductUpdate";
import { RouteModal } from "@/components/ui/RouteModal";

export default async function EditProductModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = {
    name: "string",
    category: "string",
    price: "string",
    unit: "string",
    image: "string",
    stock: false,
    description: "string",
  };

  return (
    <RouteModal title={`Редактировать товар #${id}`}>
      <div>
        <p>Форма редактирования товара</p>
        <p>ID: {id}</p>
        <FormProductUpdate product={product} />
      </div>
    </RouteModal>
  );
}
