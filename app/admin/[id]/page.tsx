import { FormProductUpdate } from "@/components/shared/FormProduct/FormProductUpdate/FormProductUpdate";
import { WrapperUpdateProduct } from "@/components/shared/FormProduct/WrapperUpdateProduct/WrapperUpdateProduct";
import { Title } from "@/components/ui/Title";

export default function AdminProductEditPage() {
  return (
    <div>
      <Title>Редактирование товара</Title>
      <WrapperUpdateProduct />
    </div>
  );
}
