'use client'

import { formSchema } from '@/schema/voice-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
// import { useTransition } from 'react'
import { Textarea } from '../ui/textarea'

export default function TextForm() {
  const [error, setError] = useState<string>()
  // const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setError(undefined)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">
                Texto que será convertido em áudio:
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="She got eyes of the bluests skies..."
                  autoComplete="off"
                  rows={2}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Após digitar o texto, clique em &quot;Gerar&quot; para ouvir a
                voz gerada.
              </FormDescription>
            </FormItem>
          )}
        />
        {error && (
          <FormDescription className="text-red-500">{error}</FormDescription>
        )}
      </form>
    </Form>
  )
}
