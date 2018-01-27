import { Injectable } from '@angular/core';
import * as $ from "jquery";

@Injectable()
export class FloatingButtonService {

  constructor() { }

  floatActionButton() {
    $('.float-button-container').css({
      'position': 'fixed',
      'bottom': 0.5,
      'left': 0,
      'right': 0,


      'width': '100%'
    })

    $(window).on('scroll', function () {
      let lastScrollTop = 0;
      var curScroll = $(this).scrollTop();
      var docH = $(document).height() - $(window).height();

      if (curScroll > lastScrollTop) {

        $('.float-bottom-containter').stop().animate({
          'bottom': 0
        })

      }
      lastScrollTop = curScroll;
    })
  }

  floatActionButtonModal() {
    $('.float-button-container-modal').css({
      'position': 'fixed',
      'bottom': 0.5,
      'left': 0,
      'right': 0,


      'width': '100%'
    })

    $(window).on('scroll', function () {
      let lastScrollTop = 0;
      var curScroll = $(this).scrollTop();
      var docH = $(document).height() - $(window).height();

      if (curScroll > lastScrollTop) {

        $('.float-bottom-containter').stop().animate({
          'bottom': 0
        })

      }
      lastScrollTop = curScroll;
    })
  }
}

