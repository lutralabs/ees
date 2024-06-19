export const validateOrGetDefaultPage = (
  page: string | undefined | null
): number => {
  if (!page) return 1;
  const pageNumber = Number.parseInt(page);
  if (Number.isNaN(pageNumber)) return 1;
  return pageNumber;
};
