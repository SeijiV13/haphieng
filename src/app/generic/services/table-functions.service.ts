import { Injectable } from '@angular/core';
import {DataPasserService} from '../services/data-passer.service';
@Injectable()
export class TableFunctionsService {
  counter: number = 0;
  constructor(private dataPasserService: DataPasserService) { }
  // e is the target DOM, data is the information to be stored, container is where to store data
  onTableRowClick(e, data, container, buttonIds: Array<string>) {
    if (!$(e.target).hasClass("checkbox-results")) {
        var $checkbox = $(e.target).parent().children(".checkbox-container").children(".checkbox-results");

        if (!$checkbox.is(":checked")) {
            $('.checkbox-results').prop('checked', false);
            $checkbox.prop('checked', true);
            this.dataPasserService.selectedData = data;

            for(let buttonId of buttonIds){
              $("#"+ buttonId).removeClass('disabled-button');
            }

             //make selected row active
              $("tr").removeClass("active-row");
              $(e.target).parent().addClass("active-row");

        }
        else {
            $checkbox.prop('checked', false);
            //removes the selected rrequest
            this.dataPasserService.selectedData = null;
            for(let buttonId of buttonIds){
              $("#"+ buttonId).addClass('disabled-button');
            }
            //make selected row inactive
            $(e.target).parent().removeClass("active-row");

        }

    }

}

  //fires when the row is clicked
  onTableRowClickMultiple(e, data, buttonIdSingle: Array<string>, buttonIdMultiple: Array<String>, primaryKey) {
    if (!$(e.target).hasClass("checkbox-results")) {
        var $checkbox = $(e.target).parent().children(".checkbox-container").children(".checkbox-results");

        if (!$checkbox.is(":checked")) {

            //checks the checkbox
            $checkbox.prop('checked', true);
            this.counter = this.counter + 1;
            //adds the result to the array
            this.dataPasserService.multipleSelectedData.push(data[primaryKey]);

            $(e.target).parent().addClass("active-row");
        }
        else {
            //unchecks the checkbox

            $checkbox.prop('checked', false);
            this.counter = this.counter - 1;
            //removes the result to the array
            for (let fetchData of this.dataPasserService.multipleSelectedData) {
                if (fetchData == data[primaryKey]) {
                   this.dataPasserService.multipleSelectedData = this.dataPasserService.multipleSelectedData.filter(data2 => data2 !== fetchData);
                }
            }

            $(e.target).parent().removeClass("active-row");
        }

        if (this.counter === 0) {
           for(let buttonId of buttonIdMultiple){
            $("#"+ buttonId).addClass('disabled-button');
            }
            for(let buttonId of buttonIdSingle){
            $("#"+ buttonId).addClass('disabled-button');
             }
        }

        else if (this.counter === 1) {
          for(let buttonId of buttonIdMultiple){
            $("#"+ buttonId).removeClass('disabled-button');
            }
          for(let buttonId of buttonIdSingle){
            $("#"+ buttonId).removeClass('disabled-button');
            }
  
            this.dataPasserService.selectedData = data;
        }
        else {
          for(let buttonId of buttonIdMultiple){
            $("#"+ buttonId).removeClass('disabled-button');
            }
          for(let buttonId of buttonIdSingle){
             $("#"+ buttonId).addClass('disabled-button');
             }
           this.dataPasserService.selectedData = null;
        }

        // get the selected requests
        let checker = true;
        $('tbody tr').filter(':has(:checkbox:not(:checked))').each(function () {
            checker = false;
        }); if (checker) {
            $(".all-check-box").prop("checked", true);
        } else {
            $(".all-check-box").prop("checked", false);
        }

        console.log(this.dataPasserService.multipleSelectedData);
    }
}

onUpdateCheckboxMultiple(e, data, buttonIdSingle: Array<string>, buttonIdMultiple: Array<String>, primaryKey){
    if ($(event.target).is(":checked")) {
      this.counter = this.counter + 1;
      this.dataPasserService.multipleSelectedData.push(data[primaryKey]);
      //highlights the selected row
      $(event.target).parent().parent().addClass("active-row");

  }
  else {
      this.counter = this.counter - 1;
      //removes the result to the array
      for (let fetchData of this.dataPasserService.multipleSelectedData) {
          if (fetchData == data[primaryKey]) {
              this.dataPasserService.multipleSelectedData = this.dataPasserService.multipleSelectedData.filter(data2 => data2 !== fetchData);
          }
      }

      //removes the highlight of the selected row

      $(event.target).parent().parent().removeClass("active-row");
  }
  if (this.counter === 0) {
        for(let buttonId of buttonIdMultiple){
          $("#"+ buttonId).addClass('disabled-button');
          }
          for(let buttonId of buttonIdSingle){
          $("#"+ buttonId).addClass('disabled-button');
           }

  }

  else if (this.counter === 1) {
    for(let buttonId of buttonIdMultiple){
      $("#"+ buttonId).removeClass('disabled-button');
      }
      for(let buttonId of buttonIdSingle){
      $("#"+ buttonId).removeClass('disabled-button');
       }

    //assigns the selected request for inquire or reendorse
     this.dataPasserService.selectedData = data;


  }
  else {
    for(let buttonId of buttonIdMultiple){
      $("#"+ buttonId).removeClass('disabled-button');
      }
      for(let buttonId of buttonIdSingle){
      $("#"+ buttonId).addClass('disabled-button');
      }

      this.dataPasserService.selectedData = null;
  }

  let checker = true;
  $('tbody tr').filter(':has(:checkbox:not(:checked))').each(function () {
      checker = false;
  }); if (checker) {
      $(".all-check-box").prop("checked", true);
  } else {
      $(".all-check-box").prop("checked", false);
  }

  

}


onUpdateCheckBox(e, data, container, buttonIds) {
  var rowParent = $(e.target).parent().parent();
  if ($(e.target).is(":checked")) {
      $('.checkbox-results').prop('checked', false);
      e.target.checked = true;

   
      for(let buttonId of buttonIds){
        $("#"+ buttonId).removeClass('disabled-button');
      }
      this.dataPasserService.selectedData= data;
      //make selected row active
      $("tr").removeClass("active-row");
      $(rowParent).addClass("active-row");

  }
  else {
     this.dataPasserService.selectedData = null;
      for(let buttonId of buttonIds){
        $("#"+ buttonId).addClass('disabled-button');
      }
      $(rowParent).removeClass("active-row");

  }


}

checkAllCheckBox(event, results, buttonIdSingle: Array<string>, buttonIdMultiple: Array<String>, primaryKey) {
  var counter = 0;
  
  if ($(event.target).is(":checked")) {
      $(".checkbox-results").prop("checked", true);
      //highlights all rows
      $("tr").addClass("active-row");
      $("tfoot").children("tr").removeClass("active-row");

      //restart the buttons
      for(let buttonId of buttonIdMultiple){
        $("#"+ buttonId).removeClass('disabled-button');
      }
      for(let buttonId of buttonIdSingle){
        $("#"+ buttonId).addClass('disabled-button');
      }

      //retrieves the rows per page
      for (let data of results) {
          if (data && this.dataPasserService.multipleSelectedData.indexOf(data[primaryKey]) <= -1) {
              this.dataPasserService.multipleSelectedData.push(data[primaryKey]);
              
          }
      }
  }
  else {
      $(".checkbox-results").prop("checked", false);
      $("tr").removeClass("active-row");


      for (let data of results) {
          if (data) {
              this.dataPasserService.multipleSelectedData = this.dataPasserService.multipleSelectedData.filter(data2 => data2 !== data[primaryKey]);
          }
      }
      this.dataPasserService.multipleSelectedData = [];
      //disables all button
      if (this.dataPasserService.multipleSelectedData.length === 0) {
        for(let buttonId of buttonIdMultiple){
          $("#"+ buttonId).removeClass('disabled-button');
        }
      }
  }

  $(".checkbox-results").each(function () {
      if ($(this).is(":checked")) {
          counter++;

      }

  }
  );

  console.log(this.dataPasserService.multipleSelectedData);
  this.counter = counter;

}


}
