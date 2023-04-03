const options1 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2ed2122782mshb0bd5103e30dff1p15b6dejsne48d99f47488',
		'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
	}
};

export const fetchCities = async ( city ) => {
  const normalizedCityName = city.toLowerCase().trim().replace(/ /g, '%20');
  console.log('normalizedCityName', normalizedCityName);
  const response = await fetch(`https://hotels4.p.rapidapi.com/locations/v3/search?q=${normalizedCityName}&locale=en_US&langid=1033&siteid=300000001`, options1);
  const responseData = await response.json();
  console.log('responseData', responseData);
  return responseData;
};


export const fetchHotels = async (rid) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '2ed2122782mshb0bd5103e30dff1p15b6dejsne48d99f47488',
      'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
    },
    body: `{"currency":"USD","eapid":1,"locale":"en_US","siteId":300000001,"destination":{"regionId":"${rid}"},"checkInDate":{"day":17,"month":4,"year":2023},"checkOutDate":{"day":18,"month":4,"year":2022},"rooms":[{"adults":2,"children":[]}],"resultsStartingIndex":0,"resultsSize": 9,"sort":"PRICE_LOW_TO_HIGH","filters":{"price":{"max":1000,"min":1}}}`
  };
  const response = await fetch('https://hotels4.p.rapidapi.com/properties/v2/list', options);
  const responseData = await response.json();

  // console.log(responseData);

  return responseData;
};

export const loadData = async (city) => {
  const foundCity = await fetchCities(city);
  const cityData = foundCity.sr.find(place => place.type === 'CITY');
  console.log('cityData', cityData);
  const cityId = cityData.gaiaId;

  const res = await fetchHotels(cityId);
  console.log('res', res)

  return res;
}