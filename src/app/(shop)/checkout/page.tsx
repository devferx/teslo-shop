import Link from 'next/link'
import Image from 'next/image'

import { Title } from '@/components'
import { initialData } from '@/seed/seed'

const producsInCart = initialData.products.slice(0, 3)

export default function CheckoutPage() {
  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col">
        <Title title="Verificar orden" />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Cart */}
          <div className="mt-5 flex flex-col">
            <span className="text-xl">Ajustar elementos</span>
            <Link className="mb-5 underline" href="/cart">
              Editar carrito
            </Link>

            {producsInCart.map((product) => (
              <div className="mb-5 flex" key={product.slug}>
                <Image
                  className="mr-5 rounded"
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                />

                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="h-fit rounded-xl bg-white p-7 shadow-xl">
            <h2 className="mb-2 text-2xl">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Jhonn Doe</p>
              <p>Av. Siempre viva 123</p>
              <p>Col. Centro</p>
              <p>Alcadía Cuauhtémoc</p>
              <p>Cuaidad de México</p>
              <p>CP 1231232</p>
              <p>123.123.123</p>
            </div>

            {/*  */}
            <div className="mb-10 h-0.5 w-full rounded bg-gray-200" />
            <h2 className="mb-2 text-2xl">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Inpuestos (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-right text-2xl">$ 100</span>
            </div>

            <div className="mb-2 mt-5 w-full">
              <p className="mb-5">
                <span className="text-xs">
                  Al hacer click en &quot;Colocar orden&quot;, aceptas nuestros{' '}
                  <a className="underline" href="#">
                    términos y condiciones
                  </a>{' '}
                  y{' '}
                  <a className="underline" href="#">
                    política de privacidad
                  </a>
                </span>
              </p>
              <Link
                className="btn-primary flex justify-center"
                href="/orders/123"
              >
                Colocar Orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
