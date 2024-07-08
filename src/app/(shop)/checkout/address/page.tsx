import { Title } from '@/components'
import { AddressForm } from './ui/AddressForm'

export default function CheckoutAddressPage() {
  return (
    <div className="mb-72 flex flex-col px-10 sm:items-center sm:justify-center sm:px-0">
      <div className="flex w-full flex-col justify-center text-left xl:w-[1000px]">
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <AddressForm />
      </div>
    </div>
  )
}
