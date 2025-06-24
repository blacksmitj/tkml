export const parseDisability = (
  value: string | number | undefined | null
): boolean => {
  if (value === undefined || value === null) return false;

  const normalized = String(value).toLowerCase().trim();

  return ["iya", "ya", "1", "true", "benar", "disabilitas"].includes(
    normalized
  );
};
