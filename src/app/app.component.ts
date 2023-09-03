import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bar-code-num-generator';

  result:any =[];

  onSubmit(formData: any) {
    // Handle form submission here
    console.log(formData);

    if(formData.startingNum.length == 13 && formData.startingNum.length >0){
      this.generrateNumbers(formData.startingNum,formData.gap);
      
    }
    else{
      window.alert("Starting number length should be 13 characters");
    }
    // else if(formData.length != 13 && formData.startingNumber.length == 0){
    //   window.alert("Starting number length should be 13 characters");
    // }
    // else if(formData.gap.length == 0){
    //   window.alert("Please provide a valid gap number");
    // }
  }

   generrateNumbers(startingNumber:any , gap:any){

    this.result = [];
    let Bsnum = parseInt(startingNumber);
    let Bgap = parseInt(gap);

    for (let i = 0; i < 10; i++)
    {
        this.result.push(Bsnum + Bgap);
        Bsnum += Bgap;
    }
   }

}
