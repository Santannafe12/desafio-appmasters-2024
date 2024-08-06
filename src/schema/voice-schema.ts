'use client'

import { z } from 'zod'

export const formSchema = z.object({
  text: z
    .string()
    .min(5, {
      message: 'Digite uma mensagem com no mínimo 5 caracteres',
    })
    .max(200, {
      message: 'Digite uma mensagem com no máximo 200 caracteres',
    }),
})

export type Form = z.infer<typeof formSchema>
