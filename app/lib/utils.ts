export const formatNhsNumber = (nhsNumber: string): string => {
  return nhsNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
};

export const removeSpacesFromNhsNumber = (nhsNumber: string): string => {
  return nhsNumber.includes(" ") ? nhsNumber.replace(/\s+/g, "") : nhsNumber;
};
