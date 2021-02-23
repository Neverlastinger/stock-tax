/**
 *
 * @param  {String}  date: YYYY-MM-DD, e.g. 2020-05-15
 * @return {Promise}
 */
export const fetchCurrencyData = async (date) => {
  const response = await fetch(`https://api.exchangeratesapi.io/${date}?base=USD&symbols=BGN`);
  const result = await response.json();
  return result;
};
