export function unwrap(val: any): string {
  return val && typeof val === "object" ? JSON.stringify(val) : String(val);
}

export function parseCartItem(item: any) {
  const productId =
    typeof item.productId === "object" && (item as any).productId?.productId
      ? (item as any).productId.productId
      : item.productId;
  const variantId =
    item.variantId ||
    (typeof item.productId === "object" && (item as any).productId?.variantId) ||
    "";
  const quantity =
    item.quantity ||
    (typeof item.productId === "object" && (item as any).productId?.quantity) ||
    1;
  return {
    productId: String(productId),
    variantId: String(variantId),
    quantity: Number(quantity),
  };
}
