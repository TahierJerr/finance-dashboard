export function formatDateToDDMMYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function parseDateFromDDMMYYYY(dateStr: string): Date | undefined {
  if (!dateStr) return undefined;

  const parts = dateStr.split(/[-\/]/);
  if (parts.length !== 3) return undefined;

  const [day, month, year] = parts.map(Number);
  if (!day || !month || !year) return undefined;

  const date = new Date(year, month - 1, day);
  if (isNaN(date.getTime())) return undefined;

  return date;
}
