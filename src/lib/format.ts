const currency = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  minimumFractionDigits: 2,
});

export function formatPrice(price: number) {
  return currency.format(price);
}