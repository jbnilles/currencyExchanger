import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currencyExhange.js';


function createCurrencyDescriptionsArray(){
  let str = "AED	UAE_Dirham	United_Arab_Emirates ARS	Argentine_Peso	Argentina AUD	Australian_Dollar	Australia BGN	Bulgarian_Lev	Bulgaria BRL	Brazilian_Real	Brazil BSD	Bahamian_Dollar	Bahamas CAD	Canadian_Dollar	Canada CHF Swiss_Franc Switzerland CLP	Chilean_Peso	Chile CNY	Chinese_Renminbi	China COP	Colombian_Peso	Colombia CZK	Czech_Koruna	Czech_Republic DKK	Danish_Krone	Denmark DOP	Dominican_Peso	Dominican_Republic EGP	Egyptian_Pound	Egypt EUR	Euro	Many_European_Countries FJD	Fiji_Dollar	Fiji GBP	Pound_Sterling	United_Kingdom GTQ	Guatemalan_Quetzal	Guatemala HKD	Hong_Kong_Dollar	Hong_Kong HRK	Croatian_Kuna	Croatia HUF	Hungarian_Forint	Hungary IDR	Indonesian_Rupiah	Indonesia ILS	Israeli_New_Shekel	Israel INR	Indian_Rupee	India ISK	Icelandic_Krona	Iceland JPY	Japanese_Yen	Japan KRW	South_Korean_Won	South_Korea KZT	Kazakhstani_Tenge	Kazakhstan MVR	Maldivian_Rufiyaa	Maldives MXN	Mexican_Peso	Mexico MYR	Malaysian_Ringgit	Malaysia NOK	Norwegian_Krone	Norway NZD	New_Zealand_Dollar	New_Zealand PAB	Panamanian_Balboa	Panama PEN	Peruvian_Sol	Peru PHP	Philippine_Peso	Philippines PKR	Pakistani_Rupee	Pakistan PLN	Polish_Zloty	Poland PYG	Paraguayan_Guarani	Paraguay RON	Romanian_Leu	Romania RUB	Russian_Ruble	Russia SAR	Saudi_Riyal	Saudi_Arabia SEK	Swedish_Krona	Sweden SGD	Singapore_Dollar	Singapore THB	Thai_Baht	Thailand TRY	Turkish_Lira	Turkey TWD	New_Taiwan_Dollar	Taiwan UAH	Ukrainian_Hryvnia	Ukraine USD	United_States_Dollar	United_States UYU	Uruguayan_Peso	Uruguay ZAR	South_African_Rand	South_Africa"
  str = str.replaceAll('\t', ' ');
  str = str.replaceAll('  ', ' ');
  str = str.split(' ');
  let results = [];
  for(let i= 0; i < str.length; i+= 3) {
    let temp = [str[i], str[i+1], str[i+2]];
    results.push(temp)
  }
  return results;
}
function getCurrencyDescription (currencyCode, currencyDescriptionsArray) {
  for(let i = 0; i < currencyDescriptionsArray.length; i++) {
    if(currencyDescriptionsArray[i][0] === currencyCode) {
      return currencyDescriptionsArray[i];
    }
  }
  return false;
}

function writeCurrencies(dropdownTo, dropdownFrom) {
  let htmlTo = '';
  let htmlFrom = '';
  const conversionKeys = Object.keys(sessionStorage);
  conversionKeys.sort();
  conversionKeys.forEach(function (key){
    htmlTo += `<option value='${key}'>${key}</option>`;
    htmlFrom += `<option value='${key}'>${key}</option>`;
  });
  dropdownTo.html(htmlTo);
  dropdownFrom.html(htmlFrom);
}
function writeRates(ratesDiv, countryFrom, countryTo, amount, result) {
  let html ='';
  html += '<h1>Conversion Rates</h1>';
  html += `<h3>${amount.toFixed(2)} ${countryFrom} = ${result.toFixed(2)} ${countryTo}</h3>`;
  html += `<h6>1 ${countryFrom} = ${sessionStorage[countryTo] / sessionStorage[countryFrom]} ${countryTo}</h6>`;
  html += `<h6> ${sessionStorage[countryFrom] / sessionStorage[countryTo]} ${countryFrom} = 1 ${countryTo}</h6>`;
  ratesDiv.html(html);
}
function writeDescription(country, currencyDescriptionsArray, countryCard ) {
  let countryDescription = getCurrencyDescription (country, currencyDescriptionsArray)
  countryCard.find('.card-header h3').text(countryDescription[1].replaceAll('_', ' '));

}
function setUpStart(countryFrom, countryTo, currencyDescriptionsArray) {
  console.log(countryFrom);

  writeDescription(countryFrom,  currencyDescriptionsArray, $("#currency-from-card"));
  writeDescription(countryTo,  currencyDescriptionsArray, $("#currency-to-card"));
}




$(document).ready(function() {
  CurrencyExchange.writeRatesToSession();
  let currencyDescriptionsArray = createCurrencyDescriptionsArray();
  writeCurrencies($('#currencyTo'),$('#currencyFrom'));
  let children = $('#currencyFrom').children() ;
  console.log(children.val())
  
  setUpStart(children.val(), children.val(), currencyDescriptionsArray)
  
  
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
  });
  $('#currencyTo').change(function () {
    let countryFrom = $('#currencyFrom :selected').val();
    let countryTo = $('#currencyTo :selected').val();
    let amount = parseFloat($('#amount').val());
    let conversionAmount = CurrencyExchange.convert(amount,countryFrom, countryTo);
    $('#result').val(conversionAmount.toFixed(2));
    writeDescription(countryTo,  currencyDescriptionsArray, $("#currency-to-card"));
  });
  $('#currencyFrom').change(function () {
    let countryFrom = $('#currencyFrom :selected').val();
    let countryTo = $('#currencyTo :selected').val();
    let amount = parseFloat($('#amount').val());
    let conversionAmount = CurrencyExchange.convert(amount,countryFrom, countryTo);
    $('#result').val(conversionAmount.toFixed(2));
    writeDescription(countryFrom,  currencyDescriptionsArray, $("#currency-from-card"));

  });
  $('#result').change(function () {
    let countryFrom = $('#currencyFrom :selected').val();
    let countryTo = $('#currencyTo :selected').val();
    let amount = parseFloat($('#result').val());
    let conversionAmount = CurrencyExchange.convert(amount, countryTo, countryFrom);
    $('#amount').val(conversionAmount.toFixed(2));
  });
});