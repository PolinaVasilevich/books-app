export function getDateAndTime(date) {
  return `${new Date(date).toLocaleDateString()} ${new Date(
    date
  ).toLocaleTimeString()} `;
}
