import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currencyExhange.js';


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
});