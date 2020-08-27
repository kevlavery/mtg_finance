
export const handleErrors = (response) => {
  if (response.error) throw Error(response.status);
  return response;
};
export default handleErrors;
