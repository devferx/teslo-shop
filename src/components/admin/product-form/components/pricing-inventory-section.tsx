'use client'

import { Control } from 'react-hook-form'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { ProductFormInputs } from '@/schemas'

interface PricingInventorySectionProps {
  control: Control<ProductFormInputs>
}

export const PricingInventorySection = ({
  control,
}: PricingInventorySectionProps) => (
  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
    <CardHeader>
      <CardTitle className="text-lg">Precios e inventario</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-4 sm:grid-cols-2">
      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Precio ($)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                inputMode="decimal"
                {...field}
                value={field.value ?? ''}
                onChange={(event) => {
                  const { value, valueAsNumber } = event.target
                  field.onChange(value === '' ? undefined : valueAsNumber)
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="inStock"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Inventario</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                {...field}
                value={field.value ?? ''}
                onChange={(event) => {
                  const { value, valueAsNumber } = event.target
                  field.onChange(value === '' ? undefined : valueAsNumber)
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </CardContent>
  </Card>
)
