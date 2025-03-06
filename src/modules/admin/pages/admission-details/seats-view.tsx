'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import * as z from 'zod'

const formSchema = z.object({
  seat: z.preprocess(
    (value) => (value ? Number(value) : undefined),
    z
      .number()
      .min(10, {
        message: 'El número de vacantes no puede ser menor a 10',
      })
      .max(100, {
        message: 'El número de vacantes no puede ser mayor a 100',
      })
  ),
})

export const SeatsView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      seat: 10,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
    } catch (error) {
      console.error('Form submission error', error, values)
    }
  }

  return (
    <>
      <div className="space-y-5">
        <section className="flex flex-col items-start justify-start">
          <h2 className="text-xl font-semibold">Vacantes</h2>
          <span className="text-sm text-gray-600">
            Aquí puedes ver, actualizar las vacantes disponibles para la carrera
            seleccionada.
          </span>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-screen-md"
            >
              <FormField
                control={form.control}
                name="seat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de vacantes</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Número de vacantes"
                        type="number"
                        min={1}
                        max={100}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant={'default'}
              >
                Guardar
              </Button>
            </form>
          </Form>
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-bold">Vacantes disponibles</h2>
            <p className="text-gray-700">Número de vacantes: 10</p>
          </div>
        </section>
      </div>
    </>
  )
}
