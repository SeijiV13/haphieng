import { Injectable } from '@angular/core';
import * as $ from 'jquery';
@Injectable()
export class PasswordMeterService {

  constructor() { }
  //pwMeter converted to service Seiji Villafranca September 9, 2017
  passwordMeter(id: string, minLength, maxLength, maxCon, maxRep) {


    var fieldType = $(id).prop('tagName');

    if (fieldType != 'INPUT' || $(id).is(':radio') || $(id).is(':checkbox')) {

      if (window.console && window.console.log) {
        window.console.log("Error creating password meter in " + this + " Plugin can only be attached to a text or password field.");
      }

      // return this;
    } else {
      var self = this;
      $(id).each(function () {
        var passwordMeterMessageStatus = ['Password Meter', 'Too Short', 'Weak', 'Fair', 'Good', 'Strong'];

        //  var settings = $.extend($.fn.pwMeter.defaults, options);

        var pwMeterBlock =
          '<div class="pw-meter">' +
          '<div class="pw-meter-bar"><div class="pw-meter-progress"></div></div>' +
          '<div class="pw-meter-msg">' +
          '<span class="pw-meter-status" style="font-size:12px">' + passwordMeterMessageStatus[0] + '</span><i class="glyphicon glyphicon-info-sign"></i>' +
          '</div>' +
          '</div>';

        $(id).parent().append(pwMeterBlock);

        $(id).on('keyup', function () {
          var inputValue = $(id).val();

          var progressBar = $('.pw-meter-bar');
          var progressStatus = $('.pw-meter-status');
          var progressState = $('.pw-meter-progress');

          // end previous animation
          for (var i = 1; i < passwordMeterMessageStatus.length; i++) {
            progressBar.removeClass('pw-passwordMeter-strength' + i);
            //progressStatus.removeClass('pw-passwordMeter-strength' + i);
            progressState.removeClass('pw-passwordMeter-strength' + i);
          }
          progressState.finish();

          // validate
          var strength = self.validateStrength($(id).val(), minLength, maxLength, maxCon, maxRep, "");

          //animate
          //progressBar.addClass('pw-passwordMeter-strength' + strength);
          progressState.addClass('pw-passwordMeter-strength' + strength);
          progressStatus.text(passwordMeterMessageStatus[strength]);
          // progressStatus.addClass('pw-passwordMeter-strength' + strength);
          var width = ((strength / (passwordMeterMessageStatus.length - 1)) * 100);
          progressState.animate({
            width: width + '%'
          });
        });
      });
    }


    /*$.fn.pwMeter.defaults = {
      //Default parameters
      minLength: 5,
      maxLength: 13,
      maxCon: 6,
      maxRep: 4,
      userID: ''
    }*/

    /* $.fn.isPasswordValid = function () {
       var strength = this.validateStength($(this));
       if (strength >= 3) // Fair
         return true;
       return false;
     } */



  }

  validateStrength(input, minLength, maxLength, maxCon, maxRep, userID) {
    var minLength = minLength;
    var maxLength = maxLength;
    var maxCon = maxCon;
    var maxRep = maxRep;
    var pword = input;
    var userID = userID;

    var strength = 0;

    if (pword.length == 0)
      strength = 0;
    else if (pword.length > maxLength)
      strength = 2;
    else if (pword.length >= minLength) {
      strength = 2;
      if (pword.match(/[0-9]/g) != null && pword.match(/[a-z]/g) != null && pword.match(/[A-Z]/g) != null && pword.match(/[\W]/g) != null) {
        //if password has all of the above characters
        strength = 3;
        if (pword.match(/[0-9]/g).length > 1 && pword.match(/[a-z]/g).length > 1 && pword.match(/[A-Z]/g).length > 1 && pword.match(/[\W]/g).length > 1) {
          //if password has all of the above characters with more than one instance
          strength = 5;
        } else {
          //if password has all of the above characters with at least one with more than one instance
          if (pword.match(/[0-9]/g).length > 1) {
            strength = 4;
          } else if (pword.match(/[A-Z]/g).length > 1) {
            strength = 4;
          } else if (pword.match(/[\W]/g).length > 1) {
            strength = 4;
          }
        }
      }

      //Modified GGP20170223 Changed \1 to \\1
      // repeating characters
      var regex = new RegExp('(.)\\1{' + maxRep + ',}', "g");
      if (pword.toUpperCase().match(regex))
        strength = 2;
      // sequential characters
      var prev = 0;
      var aCtr = 0;
      var dCtr = 0;
      for (var x = 0; x < pword.length; x++) {
        var curr = pword.toUpperCase().charCodeAt(x);
        if ((curr >= 65 && curr <= 90) || (curr >= 48 && curr <= 57)) // A-Z OR 0-9
        {
          if (curr - prev == 1)
            aCtr++;
          else
            aCtr = 0;

          if (prev - curr == 1)
            dCtr++;
          else
            dCtr = 0;
        } else {
          aCtr = 0;
          dCtr = 0;
        }

        prev = curr;

        //Modified GGP20170223 Changed maxRep to maxCon
        if (aCtr >= maxCon || dCtr >= maxCon)
          strength = 2;
      }
      if (userID.toUpperCase() != null && userID.toUpperCase() != "") {
        var regex = new RegExp(userID.toUpperCase(), "g");
        if (pword.toUpperCase().match(regex))
          strength = 2;
      }

      if (pword.toUpperCase().match(/(PASSWORD)/g))
        strength = 2;

      //Added GGP20170223 make strength weak if password contains invalid character
      var invalid = new RegExp("(.*)([<>;:\'\"|\\^\\[\\]\\{\\}\\(\\)\\/\\\\]+)(.*)");
      if (pword.toUpperCase().match(invalid))
        strength = 2;
    } else
      strength = 1;

    return strength;
  }

}
