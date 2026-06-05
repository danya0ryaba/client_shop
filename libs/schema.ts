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

export const formSchemaUpdateProduct = z.object({
  name: z.string().min(1, { message: "Название товара обязательно" }),
  category: z.string().min(1, { message: "Категория обязательна" }),
  price: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Цена должна быть числом" }),
  unit: z.string().min(1, { message: "Единица измерения обязательна" }),
  image: z.string().url({ message: "Некорректный URL изображения" }),
  description: z.string().optional(),
  quantity: z
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
  unit: z.string().min(1, { message: "Единица измерения обязательна" }),
  image: z.string().url({ message: "Некорректный URL изображения" }),
  description: z.string().optional(),
  quantity: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Количество должно быть числом" }),
  size: z.string().optional(),
});

export type FormStateProductCreate = z.infer<typeof formSchemaCreateProduct>;
