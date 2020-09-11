export default class CurrencyExchange {
  
  static getRates(country) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${country}`;
      request.onload = function() {
        if(this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open('GET', url, true);
      request.send();

    });
  }
  writeRatesToSession() {
    let promise = CurrencyExchange.getRates('USD');
    promise.then(function (response) {
      const body = JSON.parse(response);
      for(const key in response.conversion_rates) {
        sessionStorage.setItem(key, response.conversion_rates[key]);
      }
      console.log(body);
    }, function(error) {
    console.log(error);
    });
  }

  convertFromUS(amountFrom,countryFrom, countryTo) {
    return (amountFrom * sessionStorage.getItem(countryFrom)) * essionStorage.getItem(countryTo);
  }

}