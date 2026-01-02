import { Control } from 'react-hook-form'
import { Plus, X } from 'lucide-react'

import { Category } from '@/interfaces'
import { ProductFormInputs } from '@/schemas'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

interface AttributesSectionProps {
  control: Control<ProductFormInputs>
  categories: Category[]
  sizes: string[]
  tagDraft: string
  setTagDraft: (value: string) => void
  parsedTags: string[]
  watchedTags: string
  addTag: () => void
  removeTag: (tag: string) => void
}

export const AttributesSection = ({
  control,
  categories,
  sizes,
  tagDraft,
  setTagDraft,
  parsedTags,
  watchedTags,
  addTag,
  removeTag,
}: AttributesSectionProps) => (
  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
    <CardHeader>
      <CardTitle className="text-lg">Atributos</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Género</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value ?? undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="men">Hombres</SelectItem>
                  <SelectItem value="women">Mujeres</SelectItem>
                  <SelectItem value="kid">Niños</SelectItem>
                  <SelectItem value="unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value ?? undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="sizes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tallas disponibles</FormLabel>
            <FormControl>
              <ToggleGroup
                type="multiple"
                value={field.value ?? []}
                onValueChange={field.onChange}
                className="justify-start gap-2"
              >
                {sizes.map((size) => (
                  <ToggleGroupItem
                    key={size}
                    value={size}
                    className="border-border/50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground h-10 w-12 border"
                  >
                    {size}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Etiquetas</FormLabel>
            <div className="mb-2 flex flex-wrap gap-2">
              {parsedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="gap-1 px-2 py-1"
                >
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}>
                    <X className="hover:text-destructive h-3 w-3 cursor-pointer" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Añadir tag"
                value={tagDraft}
                onChange={(event) => setTagDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    addTag()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addTag}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <input
              type="hidden"
              {...field}
              value={watchedTags}
              onChange={field.onChange}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </CardContent>
  </Card>
)
