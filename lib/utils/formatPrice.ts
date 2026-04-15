const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export function formatVND(amount: number): string {
  return formatter.format(amount);
}
