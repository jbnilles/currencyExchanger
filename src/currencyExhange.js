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
  static writeRatesToSession() {
    let promise = CurrencyExchange.getRates('USD');
    promise.then(function (response) {
      const body = JSON.parse(response);
      //console.log(body);
      const conversionKeys = Object.keys(body.conversion_rates);
      conversionKeys.forEach(function (key){
        sessionStorage.setItem(key, body.conversion_rates[key]);
      })
      //console.log(sessionStorage);
    }, function(error) {
    console.log(error);
    });
  }

  static convert(amountFrom,countryFrom, countryTo) {
    console.log(sessionStorage.getItem(countryFrom) / sessionStorage.getItem(countryTo))
    console.log( sessionStorage.getItem(countryTo) / sessionStorage.getItem(countryFrom))
    return (amountFrom / sessionStorage.getItem(countryFrom)) * sessionStorage.getItem(countryTo);
  }

}