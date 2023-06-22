export const parseDateTime = (params: string) => {
  const date = new Date(params);

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  } as Intl.DateTimeFormatOptions;

  const formattedDate = date.toLocaleString("en-EN", options);
  // convert to dd/mm/yyyy, hh: mm
  return formattedDate;
};

export const parseDate = (params: string) => {
  const date = new Date(params);
  
  const formattedDate = date.toLocaleDateString("en-US");
  //convert mm/dd//yyyy
  return formattedDate;
};

export const parseDateTypeInput = (params: string) => {
  const date = new Date(params);
  date.setDate(date.getDate() + 1); // Add one day to account for the time zone offset
  const formattedDate = date.toISOString().slice(0, 10);
  return formattedDate;
}
