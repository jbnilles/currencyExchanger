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
      if(body.result === 'success'){
        const conversionKeys = Object.keys(body.conversion_rates);
        conversionKeys.forEach(function (key){
          sessionStorage.setItem(key, body.conversion_rates[key]);
        });
      } else {
        alert('The currency code selected is not supported in this application');
      }
    }, function(error) {
      console.log(error);
    });
  }

  static convert(amountFrom,countryFrom, countryTo) {
    return (amountFrom / sessionStorage.getItem(countryFrom)) * sessionStorage.getItem(countryTo);
  }
  

}