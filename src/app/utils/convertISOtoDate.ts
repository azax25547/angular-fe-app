function convert(isoDate: string): string {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; // months are zero-based
  const year = date.getFullYear();

  // Ensure leading zeros for day and month
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;

  return `${formattedDay}-${formattedMonth}-${year}`;
}

export default convert;
