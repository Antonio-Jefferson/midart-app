import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string({ required_error: "A senha é obrigatória" })
      .nonempty("A senha não pode estar vazia")
      .min(6, "A senha precisa ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string({ required_error: "A confirmação é obrigatória" })
      .nonempty("A confirmação não pode estar vazia")
      .min(6, "A confirmação precisa ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
