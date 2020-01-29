export const getCurrentDate = () => {
  const currentDate =
    new Date().toDateString() + " " + new Date().getHours() + ":";
  const currentMinutes =
    new Date().getMinutes() < 10
      ? "0" + new Date().getMinutes()
      : new Date().getMinutes();
  return currentDate + currentMinutes;
};
