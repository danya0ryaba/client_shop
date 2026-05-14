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
