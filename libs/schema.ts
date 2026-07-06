import z from "zod";

export const passwordSchema = z.string().min(6, "Минимум 6 символов");

export const emailSchema = z.email("Введите правильный email");

export const nameSchema = z.string("Введите имя");

export const formSchemaRegister = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const formSchemaLogin = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// для обновления продукта
export const formSchemaUpdateProduct = z.object({
  name: z.string().min(1, { message: "Название товара обязательно" }),
  categoryId: z.string().min(1, { message: "Категория обязательна" }),
  price: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Цена должна быть числом" }),
  unit: z.string().min(1, { message: "Единица измерения обязательна" }),
  deliveryToCities: z.boolean().optional(),
  description: z.string().optional(),
  quantityProduct: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Количество должно быть числом" }),
});
export type FormStateProductUpdate = z.infer<typeof formSchemaUpdateProduct>;

// для создания продукта
export const formSchemaCreateProduct = z.object({
  name: z.string().min(1, { message: "Название товара обязательно" }),
  category: z.string().min(1, { message: "Категория обязательна" }),
  price: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Цена должна быть числом" }),
  unit: z.string().optional(),
  deliveryToCities: z.boolean().optional(),
  image: z
    .custom<FileList>((val) => val instanceof FileList, "Выберите файлы")
    .refine((files) => files.length > 0, "Выберите хотя бы одно фото")
    .refine((files) => files.length <= 4, "Максимум 4 фотографии")
    .refine(
      (files) =>
        Array.from(files).every((file) => file.size <= 5 * 1024 * 1024),
      "Максимальный размер файла - 5MB",
    ),
  description: z.string().optional(),
  quantity: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Количество должно быть числом" }),
  size: z.string().optional(),
});
export type FormStateProductCreate = z.infer<typeof formSchemaCreateProduct>;

// для зказа
export const addressSchema = z.object({
  value: z.string().min(1, "Введите адрес"),
});

export const orderSchema = z
  .object({
    name: z.string().min(1, "Введите имя"),
    phone: z
      .string()
      .min(1, "Введите телефон")
      .regex(/^(\+?\d[\d\s()-]{8,})$/, "Введите корректный номер телефона"),
    email: z.string().trim().email("Некорректный email").optional(),
    comment: z.string().optional(),
    delivery: z.enum(["courier", "pickup"], {
      message: "Выберите способ получения",
    }),
    payment: z.enum(["cash", "cart"], {
      message: "Выберите способ оплаты",
    }),
    address: addressSchema.nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.delivery === "courier" && !data.address?.value) {
      ctx.addIssue({
        code: "custom",
        path: ["address", "value"],
        message: "Введите адрес доставки",
      });
    }
  });

export type OrderFormValues = z.infer<typeof orderSchema>;
