import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currencyExhange.js';


function writeCurrencies(dropdownTo, dropdownFrom) {
  let htmlTo = '';
  let htmlFrom = '';
  console.log(sessionStorage);
  const conversionKeys = Object.keys(sessionStorage);
  conversionKeys.sort();
  conversionKeys.forEach(function (key){
    htmlTo += `<option value='${key}'>${key}</option>`
    htmlFrom += `<option value='${key}'>${key}</option>`
  });
  
  dropdownTo.html(htmlTo);
  dropdownFrom.html(htmlFrom);
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
    alert('here')
    let countryFrom = $('#currencyFrom :selected').val();
    let countryTo = $('#currencyTo :selected').val();
    let amount = parseFloat($('#amount').val());
    let conversionAmount = CurrencyExchange.convert(amount,countryFrom, countryTo);
    $('#result').val(conversionAmount.toFixed(2));
  })
});