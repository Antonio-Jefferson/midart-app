import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "O e-mail é obrigatório" })
    .nonempty("O e-mail não pode estar vazio")
    .email("Formato de e-mail inválido"),

  password: z
    .string({ required_error: "A senha é obrigatória" })
    .nonempty("A senha não pode estar vazia")
    .min(6, "A senha precisa ter no mínimo 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
