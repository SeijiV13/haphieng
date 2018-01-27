import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loading-animation',
  templateUrl: './loading-animation.component.html',
  styleUrls: ['./loading-animation.component.css']
})
export class LoadingAnimationComponent implements OnInit {
  @Input() removeLoad: boolean;
  constructor() { }
  
  ngOnInit() {
  }

}
