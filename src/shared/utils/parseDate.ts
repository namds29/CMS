export const parseDate = (params: string) => {
    return params
      ? new Date(Date.parse(params!)).toLocaleDateString("en-GB")
      : "";
  };