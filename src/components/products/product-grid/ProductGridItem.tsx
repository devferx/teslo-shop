import { Product } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  return (
    <div className="fade-in overflow-hidden rounded-md">
      <Link href={`/product/${product.slug}`}>
        <Image
          className="w-full object-cover"
          src={`/products/${product.images[0]}`}
          alt={product.title}
          width={500}
          height={500}
        />
      </Link>

      <div className="flex flex-col p-4">
        <Link className="hover:text-blue-600" href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
