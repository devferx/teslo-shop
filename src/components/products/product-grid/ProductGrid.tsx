import { Product } from '@/interfaces';

interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="mb-10 grid grid-cols-2 gap-10 sm:grid-cols-3">
      {products.map((product) => (
        <span key={product.slug}>{product.title}</span>
      ))}
    </div>
  );
};
