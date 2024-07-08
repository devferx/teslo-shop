import { Title } from '@/components'
import { AddressForm } from './ui/AddressForm'
import { getCountries } from '@/actions'

export default async function CheckoutAddressPage() {
  const countries = await getCountries()

  return (
    <div className="mb-72 flex flex-col px-10 sm:items-center sm:justify-center sm:px-0">
      <div className="flex w-full flex-col justify-center text-left xl:w-[1000px]">
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <AddressForm countries={countries} />
      </div>
    </div>
  )
}
