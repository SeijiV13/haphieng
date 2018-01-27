import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'print-modal',
  templateUrl: './print-modal.component.html',
  styleUrls: ['./print-modal.component.css']
})
export class PrintModalComponent implements OnInit {
  slideIndex = 1;
  constructor() { }

  ngOnInit() {
  }

  doPrint() {
    let modalId = "print-modal";
    document.getElementById(modalId).style.display = "block";
    this.showPdf(1, "print-modal");
  }
  
  closePrint() {
  let modalId = "print-modal";
  document.getElementById(modalId).style.display = "none";
  }
  
  
  showPdf(n, type) {
    let slideClass = type + 'Slides';
    var i;
    var slides = document.getElementsByClassName(slideClass);
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      let slideEl = <HTMLElement>slides[i]
      slideEl.style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    let slideEl2 = <HTMLElement>slides[this.slideIndex -1]
    slideEl2.style.display = "block";
    //captionText.innerHTML = dots2[this.slideIndex - 1].alt;
  }

}
