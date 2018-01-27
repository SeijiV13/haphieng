import { Injectable } from '@angular/core';

@Injectable()
export class FormatterService {

  constructor() { }

  //formats the contact number field
  public FormatContactNumber(value) {
    // return value.match(/\d*/g)
    // .join('')
    //.match(/(\d{0,3})(\d{0,3})(\d{0,4})/).slice(1).join('-').replace(/-*$/g, '');
    if (value) {
      return value.toString().replace(/[&\/\\#,=^@$~%.`!'":;*?<>{}\[\_\]s]/g, '');
    } else {
      return null;
    }
  }

  public FormatRecommendation(value){
    if(value){
      return value.toString().replace(/[&\/\\#=^@$~%`!+()'";*?<>{}\[\_\]]/g, '');
    }else{
      return null;
    }
  }

  public FormatOrAmount(value){
    if(value){
      return value.toString().replace(/[&\/\\#=^@$~%`!+()'";*?<>{}\[\_\]s]/g, '');
    }else{
      return null;
    }
  }

  //formats the currency
  public FormatCurrency(value) {
    //return value.toString().replace(/\D/g, "")
    //.replace(/([0-9])([0-9]{2})$/, '$1.$2')
    //.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");]
    let newValue = this.formatAny(this.getNumbers(value), 2, 3, ',', '.');
    return isNaN(parseFloat(newValue)) ? "" : newValue;
  }

  //fprmats the currency Floor 2 decimal places
  public FormatCurrencyFloor2Decimal(value) {
    let numberTrim = this.trim(this.getNumbers(value), 2);
    let newValue = this.formatAny(numberTrim, 2, 3, ',', '.');
    return isNaN(parseFloat(newValue)) ? "" : newValue;
  }

  

  public FormatDecimal(value) {
    let newValue = this.formatAny(this.getNumbers(value), 2, 3, '', '.');
    return isNaN(parseFloat(newValue)) ? "" : newValue;
  }

  //formats the number
  public FormatNumber(value) {
    //return value.toString().replace(/\D/g, "")
    // .replace(/([0-9])([0-9]{2})$/, '$1.$2')
    // .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
    if (value)
      return value.toString().replace(/\D/g, '');
    else
      return null;
  }

  public FormatPage(value) {
    //return value.toString().replace(/\D/g, "")
    // .replace(/([0-9])([0-9]{2})$/, '$1.$2')
    // .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
    if (value)
      return value.toString().replace(/\D/g, '');
    else
      return null;
  }

  //format into date
  public FormatDate(value) {
    //formats date into mm/dd/yyyy
    let regex = "(?:0[1-9]|1[0-2])/(?:0[1-9]|[12][0-9]|3[01])/(?:19|20)[0-9]{2}"
    return value.replace(regex);
  }

  //formats into year
  public FormatYear(value) {
    if (value)
      return value.toString().replace(/\D/g, '').substring(0, 4);
    else
      return null;
  }

  public FormatNumberWithDecimal(value) {
    return value.replace("/^[1-9]\d{0,2}(((,\d{3})*(\.\d{2})?)|((\.\d{3})*(,\d{2})?))$/", "");
  }

  public getNumbers(value) {
    if (value)
      return value.toString().replace(/\,/g, '');
    else
      return null;
  }

  public trim(number, precision){
    var trimmedNumber = "";
    if(number && number.indexOf(".") > -1 ){
      var array = number.toString().split(".");
      array.push(array.pop().substring(0, precision));
      trimmedNumber =  array.join(".");
      return trimmedNumber;
    }
    return number;
  }

  public tctFormat(value) {
    if (value)
      return value.toString().replace(/[&\/\\#,=+^@$~%.`!'":;*?<>{}\[\_\]\s]/g, '');
    else
      return null;
  }



  /**
   * @param integer word: word
   * @param integer n: length of decimal
   * @param integer x: length of whole part
   * @param mixed   s: sections delimiter
   * @param mixed   c: decimal delimiter
   */
  public formatAny(word, n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
      num = parseFloat(word).toFixed(Math.max(0, ~~n));
    return (c ? num.toString().replace('.', c) : num).toString().replace(new RegExp(re, 'g'), '$&' + (s || ','));
  }

}
