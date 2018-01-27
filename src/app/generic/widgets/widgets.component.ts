import {Component, Renderer2, ElementRef, forwardRef, Input, OnInit} from "@angular/core";
import {WidgetComponent} from "ngx-dashboard";
 
@Component({
  selector: 'widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
  providers: [{provide: WidgetComponent, useExisting: forwardRef(() => WidgetsComponent) }]
})
export class WidgetsComponent extends WidgetComponent implements OnInit{

  @Input() public widgetId: string;
 
  constructor(ngEl: ElementRef, renderer: Renderer2) {
    super(ngEl, renderer);
  }
  ngOnInit(){}

}
