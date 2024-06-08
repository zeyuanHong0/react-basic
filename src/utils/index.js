export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，所以要加1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
