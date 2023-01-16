export async function getSortedCountries() {
  const countriesResp = await fetch("https://api.covid19api.com/summary");
  const countriesJSON = await countriesResp.json();
  const countries = countriesJSON.Countries;

  const sortedCountries = countries.sort((a: any, b: any) => {
    const aActiveCases = a.TotalConfirmed - a.TotalRecovered;
    const bActiveCases = b.TotalConfirmed - b.TotalRecovered;

    if (aActiveCases >= bActiveCases) {
      return -1;
    }
  });

  return sortedCountries;
}
