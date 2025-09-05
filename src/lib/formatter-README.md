# Centralized Currency Formatter

This utility provides a centralized way to format currency across the entire application using the Komerza API formatter.

## Usage

### For React Components (Recommended)

```tsx
import { useFormatter } from "@/lib/formatter";

export function ProductCard({ price }: { price: number }) {
  const { formatPrice } = useFormatter();

  return (
    <div>
      <span>{formatPrice(price)}</span>
    </div>
  );
}
```

### For Async Operations

```tsx
import { formatPrice } from "@/lib/formatter";

export async function generatePriceLabel(price: number) {
  const formatted = await formatPrice(price);
  return `Total: ${formatted}`;
}
```

### For Sync Operations (with fallback)

```tsx
import { formatPriceSync } from "@/lib/formatter";

export function quickFormat(price: number) {
  return formatPriceSync(price); // Uses cached formatter or fallback
}
```

## Features

- **Automatic Komerza Integration**: Fetches formatter from `globalThis.komerza.createFormatter()`
- **Caching**: Formatter is cached to avoid repeated API calls
- **Fallback Support**: Falls back to USD formatting if Komerza formatter fails
- **React Hook**: `useFormatter()` hook for easy React integration
- **TypeScript Support**: Full TypeScript support with proper types

## Migration

To migrate existing components:

1. Remove local formatter creation
2. Remove formatter props from component interfaces
3. Add `import { useFormatter } from '@/lib/formatter'`
4. Use `const { formatPrice } = useFormatter()` in component
5. Replace `formatter.format(price)` with `formatPrice(price)`

## Example Migration

Before:

```tsx
interface Props {
  price: number;
  formatter: Intl.NumberFormat;
}

function Component({ price, formatter }: Props) {
  return <span>{formatter.format(price)}</span>;
}
```

After:

```tsx
import { useFormatter } from "@/lib/formatter";

interface Props {
  price: number;
}

function Component({ price }: Props) {
  const { formatPrice } = useFormatter();
  return <span>{formatPrice(price)}</span>;
}
```
