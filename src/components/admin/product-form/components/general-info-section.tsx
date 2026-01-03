'use client'

import { Control } from 'react-hook-form'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import type { ProductFormInputs } from '@/schemas'

interface GeneralInfoSectionProps {
  control: Control<ProductFormInputs>
}

export const GeneralInfoSection = ({ control }: GeneralInfoSectionProps) => (
  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
    <CardHeader>
      <CardTitle className="text-lg">Información General</CardTitle>
      <CardDescription>Detalles básicos del producto.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título</FormLabel>
            <FormControl>
              <Input
                placeholder="Nombre del producto"
                {...field}
                value={field.value ?? ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slug</FormLabel>
            <FormControl>
              <Input
                placeholder="nombre-del-producto"
                {...field}
                value={field.value ?? ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descripción</FormLabel>
            <FormControl>
              <Textarea
                className="min-h-30 resize-none"
                placeholder="Describe tu producto..."
                {...field}
                value={field.value ?? ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </CardContent>
  </Card>
)
