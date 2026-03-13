type PaintingForShipping = {
  size_width: number;
  size_height: number;
};

export function isLargeCanvas(painting: PaintingForShipping) {
  return painting.size_width > 24 || painting.size_height > 24;
}

export function getShippingOptions(
  country: "CA" | "US",
  paintings: PaintingForShipping[],
) {
  const hasLargeCanvas = paintings.some(isLargeCanvas);

  if (country === "CA") {
    return [
      {
        shipping_rate_data: {
          type: "fixed_amount" as const,
          fixed_amount: {
            amount: 0,
            currency: "cad",
          },
          display_name: "Local pickup - London, Ontario",
          delivery_estimate: {
            minimum: { unit: "business_day" as const, value: 1 },
            maximum: { unit: "business_day" as const, value: 3 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount" as const,
          fixed_amount: {
            amount: hasLargeCanvas ? 2500 : 0,
            currency: "cad",
          },
          display_name: hasLargeCanvas
            ? "Standard shipping - Large canvas"
            : "Standard shipping",
          delivery_estimate: {
            minimum: { unit: "business_day" as const, value: 5 },
            maximum: { unit: "business_day" as const, value: 10 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount" as const,
          fixed_amount: {
            amount: hasLargeCanvas ? 6000 : 2500,
            currency: "cad",
          },
          display_name: hasLargeCanvas
            ? "Express shipping - Large canvas"
            : "Express shipping",
          delivery_estimate: {
            minimum: { unit: "business_day" as const, value: 2 },
            maximum: { unit: "business_day" as const, value: 4 },
          },
        },
      },
    ];
  }

  if (country === "US") {
    return [
      {
        shipping_rate_data: {
          type: "fixed_amount" as const,
          fixed_amount: {
            amount: hasLargeCanvas ? 6000 : 2500,
            currency: "cad",
          },
          display_name: hasLargeCanvas
            ? "US shipping - Large canvas"
            : "US shipping - Small canvas",
          delivery_estimate: {
            minimum: { unit: "business_day" as const, value: 5 },
            maximum: { unit: "business_day" as const, value: 10 },
          },
        },
      },
    ];
  }

  return [];
}
