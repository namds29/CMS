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
  return formattedDate;
};
