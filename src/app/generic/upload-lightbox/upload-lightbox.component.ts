import { Component, OnInit, Input, AfterViewInit, OnChanges, QueryList, ViewChildren} from '@angular/core';
import { InitService } from '../../generic/init.config';
import { DataPasserService} from '../../generic/services/data-passer.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';
import * as fileSaver from 'file-saver';
@Component({
  selector: 'upload-lightbox',
  templateUrl: './upload-lightbox.component.html',
  styleUrls: ['./upload-lightbox.component.css']
})
export class UploadLightboxComponent implements OnInit, AfterViewInit, OnChanges {

  constructor(private initService: InitService,  private dataPasserService: DataPasserService, private sanitized: DomSanitizer) { }
  
  @Input() document: any;
  @Input() files: any;
  @ViewChildren ('arrayLoops') arrayLoops: QueryList<any>;
  fileLink = this.initService.getConfig('host');
  
  fileJson: any[]= [];
  stopLoop: boolean = false;
  slideIndex = 1;
  ngOnInit() {
    this.fileLink = this.fileLink.replace('/api/', '');
  } 

  ngAfterViewInit(){
  }

  ngOnChanges(){
    
  }


  openModal(modal) {
        let modalId = modal + 'Modal';
        document.getElementById(modalId).style.display = "block";
        this.currentSlide(1, this.document);
  }

  closeModal(modal) {
    let modalId = modal + 'Modal';
    document.getElementById(modalId).style.display = "none";
  }



  plusSlides(n, type) {
    this.showSlides(this.slideIndex += n, type);
  }

  currentSlide(n, type) {
    this.showSlides(this.slideIndex = n, type);
  }

  showSlides(n, type) {
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
  
 
  downloadFile(file, fileName){
    fileSaver.saveAs(file, fileName);
  }


  


}
