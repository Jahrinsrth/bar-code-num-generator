import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bar-code-num-generator';


  onSubmit(formData: any) {
    // Handle form submission here
    console.log(formData);

    if(formData.startingNum.length < 5){
      window.alert("Starting number length should be 13 characters");
    }

    

   
  }

}
