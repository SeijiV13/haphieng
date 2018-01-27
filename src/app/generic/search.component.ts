import { Component , OnInit} from '@angular/core';  
import { FormControl,Validators } from '@angular/forms';

@Component({  
  selector: 'search',  
  template: `  
<div>    
  <form>
    <div class="field"  [class.error]="!searchBar.valid && searchBar.touched">  
      <label for="search">Search</label>  
      <input type="text" id="search" placeholder="Search..." formControl="search">
        <p *ngIf="searchBar.errors">This field is required!</p>
    </div>
  </form>  
</div>  
  `
})  
export class SearchComponent implements OnInit{  
    searchBar = new FormControl();
    ngOnInit() {
      this.searchBar.valueChanges.subscribe(value => {  
          alert("Change" + value);
    });

}

  clear(){
      alert("clear");
  }

  onSubmit(){  
    alert('you submitted value: ' + this.searchBar.value);  
  }
}
