import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string({ required_error: "O nome é obrigatório" }),
    email: z
      .string({ required_error: "O e-mail é obrigatório" })
      .nonempty("O e-mail não pode estar vazio")
      .email("Formato de e-mail inválido"),
    password: z
      .string({ required_error: "A senha é obrigatória" })
      .nonempty("A senha não pode estar vazia")
      .min(6, "A senha precisa ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string({ required_error: "A confirmação é obrigatória" })
      .nonempty("A confirmação não pode estar vazia")
      .min(6, "A confirmação precisa ter no mínimo 6 caracteres"),
    drawingLevel: z
      .string({ required_error: "O nível de desenho é obrigatório" })
      .nonempty("O nível de desenho não pode estar vazio")
      .refine((val) => val !== "", {
        message: "Selecione um nível de desenho",
      }),

    birthDate: z
      .string({ required_error: "A data de nascimento é obrigatória" })
      .refine(
        (value) => {
          const regex = /^\d{2}\/\d{2}\/\d{4}$/;
          return regex.test(value);
        },
        {
          message: "Formato inválido. Use dd/mm/aaaa",
        }
      )
      .refine(
        (value) => {
          const [day, month, year] = value.split("/").map(Number);
          const date = new Date(year, month - 1, day);
          const now = new Date();

          const isValid =
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day;

          if (!isValid) return false;

          const age =
            now.getFullYear() -
            year -
            (now < new Date(year, month - 1, day) ? 1 : 0);

          return age >= 10;
        },
        {
          message: "Data inválida ou menor de 10 anos",
        }
      ),
  })

  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
