import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currencyExhange.js';
// let test = "AED	UAE Dirham	United Arab Emirates ARS	Argentine Peso	Argentina AUD	Australian Dollar	Australia BGN	Bulgarian Lev	Bulgaria BRL	Brazilian Real	Brazil BSD	Bahamian Dollar	Bahamas CAD	Canadian Dollar	Canada CHF	Swiss Franc	Switzerland CLP	Chilean Peso	Chile CNY	Chinese Renminbi	China COP	Colombian Peso	Colombia CZK	Czech Koruna	Czech Republic DKK	Danish Krone	Denmark DOP	Dominican Peso	Dominican Republic EGP	Egyptian Pound	Egypt EUR	Euro	Germany FJD	Fiji Dollar	Fiji GBP	Pound Sterling	United Kingdom GTQ	Guatemalan Quetzal	Guatemala HKD	Hong Kong Dollar	Hong Kong HRK	Croatian Kuna	Croatia HUF	Hungarian Forint	Hungary IDR	Indonesian Rupiah	Indonesia ILS	Israeli New Shekel	Israel INR	Indian Rupee	India ISK	Icelandic Krona	Iceland JPY	Japanese Yen	Japan KRW	South Korean Won	South Korea KZT	Kazakhstani Tenge	Kazakhstan MVR	Maldivian Rufiyaa	Maldives MXN	Mexican Peso	Mexico MYR	Malaysian Ringgit	Malaysia NOK	Norwegian Krone	Norway NZD	New Zealand Dollar	New Zealand PAB	Panamanian Balboa	Panama PEN	Peruvian Sol	Peru PHP	Philippine Peso	Philippines PKR	Pakistani Rupee	Pakistan PLN	Polish Zloty	Poland PYG	Paraguayan Guarani	Paraguay RON	Romanian Leu	Romania RUB	Russian Ruble	Russia SAR	Saudi Riyal	Saudi Arabia SEK	Swedish Krona	Sweden SGD	Singapore Dollar	Singapore THB	Thai Baht	Thailand TRY	Turkish Lira	Turkey TWD	New Taiwan Dollar	Taiwan UAH	Ukrainian Hryvnia	Ukraine USD	United States Dollar	United States UYU	Uruguayan Peso	Uruguay ZAR	South African Rand	South Africa"
// test = test.replaceAll('\t', ' ');
// test = test.replaceAll('  ', ' ');
// test = test.split(' ');
// let results = [];
// for(let i= 0; i < test.length; i+= 3) {
//   let temp = [test[i], test[i+1], test[i+2]];
// results.push(temp)
// }


function writeCurrencies(dropdownTo, dropdownFrom) {
  let htmlTo = '';
  let htmlFrom = '';
  const conversionKeys = Object.keys(sessionStorage);
  conversionKeys.sort();
  conversionKeys.forEach(function (key){
    htmlTo += `<option value='${key}'>${key}</option>`
    htmlFrom += `<option value='${key}'>${key}</option>`
  });
  dropdownTo.html(htmlTo);
  dropdownFrom.html(htmlFrom);
}
function writeRates(ratesDiv, countryFrom, countryTo, amount, result) {
  let html ='';
  html += '<h1>Conversion Rates</h1>'
  html += `<h3>${amount} ${countryFrom} = ${result.toFixed(2)} ${countryTo}</h3>`
  html += `<h6>1 ${countryFrom} = ${sessionStorage[countryTo] / sessionStorage[countryFrom]} ${countryTo}</h6>`
  html += `<h6> ${sessionStorage[countryFrom] / sessionStorage[countryTo]} ${countryFrom} = 1 ${countryTo}</h6>`
  ratesDiv.html(html);
  
}

$(document).ready(function() {
  CurrencyExchange.writeRatesToSession();
  writeCurrencies($('#currencyTo'),$('#currencyFrom'));
  $('#convert-button').click(function () {
    let countryFrom = $('#currencyFrom :selected').val();
    let countryTo = $('#currencyTo :selected').val();
    let amount = parseFloat($('#amount').val());
    let conversionAmount = CurrencyExchange.convert(amount,countryFrom, countryTo);
    $('#result').val(conversionAmount.toFixed(2));
    writeRates($('#rates'),countryFrom,countryTo, amount, conversionAmount);
  });
  $('#amount').change(function () {
    let countryFrom = $('#currencyFrom :selected').val();
    let countryTo = $('#currencyTo :selected').val();
    let amount = parseFloat($('#amount').val());
    let conversionAmount = CurrencyExchange.convert(amount,countryFrom, countryTo);
    $('#result').val(conversionAmount.toFixed(2));
  })
  $('#currencyTo').change(function () {
    let countryFrom = $('#currencyFrom :selected').val();
    let countryTo = $('#currencyTo :selected').val();
    let amount = parseFloat($('#amount').val());
    let conversionAmount = CurrencyExchange.convert(amount,countryFrom, countryTo);
    $('#result').val(conversionAmount.toFixed(2));
  })
  $('#currencyFrom').change(function () {
    let countryFrom = $('#currencyFrom :selected').val();
    let countryTo = $('#currencyTo :selected').val();
    let amount = parseFloat($('#amount').val());
    let conversionAmount = CurrencyExchange.convert(amount,countryFrom, countryTo);
    $('#result').val(conversionAmount.toFixed(2));
  })
  $('#result').change(function () {
    let countryFrom = $('#currencyFrom :selected').val();
    let countryTo = $('#currencyTo :selected').val();
    let amount = parseFloat($('#result').val());
    let conversionAmount = CurrencyExchange.convert(amount, countryTo, countryFrom);
    $('#amount').val(conversionAmount.toFixed(2));
  })
});