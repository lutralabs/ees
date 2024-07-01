export const getPropertyValue = (data: any, name: string) => {
  const property = data.find((item: any) => item.name === name);
  if (!property) return null;
  return property.value.value as string;
};
