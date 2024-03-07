export const customDate = (createdAt: string) => {
  const date = new Date(createdAt);
  const formatDate = `${date.getHours()}:${date.getMinutes()}  ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  return formatDate
}