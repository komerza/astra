/**
 * Example usage of the centralized formatter
 */

import { useFormatter, formatPrice, formatPriceSync } from '@/lib/formatter';

// Example 1: Using the hook in a React component
export function ExampleProductCard({ price }: { price: number }) {
  const { formatPrice } = useFormatter();
  
  return (
    <div className="product-card">
      <span className="price">{formatPrice(price)}</span>
    </div>
  );
}

// Example 2: Using async formatting (useful for server-side or one-off calls)
export async function generatePriceLabel(price: number): Promise<string> {
  const formattedPrice = await formatPrice(price);
  return `Price: ${formattedPrice}`;
}

// Example 3: Using sync formatting (when you need immediate result)
export function quickPriceDisplay(price: number): string {
  return formatPriceSync(price); // Uses cached formatter or fallback
}

// Example 4: In a list component
export function ProductList({ products }: { products: Array<{ id: string, price: number }> }) {
  const { formatPrice } = useFormatter();
  
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          Product price: {formatPrice(product.price)}
        </li>
      ))}
    </ul>
  );
}
