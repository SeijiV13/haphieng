import { Component, Input, Output, EventEmitter, OnChanges, AfterViewInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { HttpClient } from '../httpClient.config';
import { PagingService } from './paging-services/paging.service'
import * as $ from "jquery";

@Component({
    selector: 'pagination-selector',
    templateUrl: './pagination.component.html',
    providers: [PagingService]
})

export class PaginationComponent implements OnChanges, AfterViewInit {
    @Input() legend: boolean = true;
    @Input('url') url: string;
    @Input('noOfRowsDisplayed') noOfRowsDisplayed: number = 10;
    @Output('returnedValueEvent') returnedValueEvent = new EventEmitter();
    @Output('showLoaderEvent') showLoaderEvent = new EventEmitter();
    @Output('changeLink') changeLink = new EventEmitter();
    public pagerOptions: any = {};

    constructor(private httpClient: HttpClient, private pagerService: PagingService) { }

    ngOnChanges() {
        if (this.url) { this.retrieveFunction(1); }
    }

    ngAfterViewInit() {

       // this.floatingTabJquery();
    }

    setPage(totalRow: number, page: number) {
        this.pagerOptions = this.pagerService.getPager(totalRow, page, this.noOfRowsDisplayed);
    }

    retrieveNewValues(pageNo: number) { 
        if (pageNo < 1 || pageNo > this.pagerOptions.totalPages) return;
        this.retrieveFunction(pageNo);
    }

    retrieveFunction(pageNo: number) {
        $(".all-check-box").prop("checked", false);
        this.showLoader(true);
        this.httpCall(this.url, this.noOfRowsDisplayed, pageNo)
            .subscribe((data) => {
                if (pageNo == 1) this.noOfRowsDisplayed = data.result.length;
                //console.log('pageNo: ' + pageNo + ' noOfRows: ' + this.noOfRowsDisplayed);
                this.setPage(data.rowCount, pageNo);
                this.doEvent(data.result);
                this.showLoader(false);
                //setTimeout(() => { this.resizeFunction(); }, 500);
            });
          this.changeLink.emit();
    }

    httpCall(url: string, noOfRowsDisplayed: number, pageNo: number): Observable<any> {
        //return this.httpClient.getBase(url + "&display=" + noOfRowsDisplayed + "&page=" + pageNo)
        return this.httpClient.getBase(url + "&page=" + pageNo).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
    }

    doEvent(data) {
        this.returnedValueEvent.emit({
            'value': data
        });
    }

    showLoader(data: boolean) {
        this.showLoaderEvent.emit({ data });
    }

    floatingTabJquery() {
        $(window).resize(() => { this.resizeFunction(); });
        $('.table-responsive').scroll(function () {
            var vportW = $(window).innerWidth();
            var tableConW = $('.paginationTab').parent().parent().parent().parent().parent().outerWidth();
            var w = $(this).find('table').outerWidth() - tableConW;
            if ($(this).scrollLeft() <= w) {
                $('tfoot div').css({

                    'left': ($(this).scrollLeft())
                });
            }
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
       // this.resizeFunction();
    }

    resizeFunction() {


        let tableConW = $('.paginationTab').parent().parent().parent().parent().parent().parent().outerWidth();
        $('.paginationTab').css({ 'width': tableConW + 'px' });
        $('.paginationTab .col-sm-3 .col-md-3 col-lg-3 col-xs-3').css({
            'width': tableConW * 0.24 + 'px',
            'left': 0,

        });
        $('.paginationTab .col-sm-6 .col-md-6 col-lg-6 col-xs-6').css({
            'width': tableConW * 0.6 + 'px',
            'left': $(this).prev().outerWidth()
        });

    }
}