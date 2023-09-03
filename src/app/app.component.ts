import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bar-code-num-generator';

  result:any =[];
  isButtonDisabled = true;

  constructor(private toastr: ToastrService){}

  onSubmit(formData: any) {
    // Handle form submission here
    console.log(formData);

    if(formData.startingNum.length == 13 && formData.startingNum.length >0){
      this.generrateNumbers(formData.startingNum,formData.gap);
      
    }
    else{
      this.toastr.error("Starting number length should be 13 characters long",'',{timeOut:3000});
    }
    // else if(formData.length != 13 && formData.startingNumber.length == 0){
    //   window.alert("Starting number length should be 13 characters");
    // }
    // else if(formData.gap.length == 0){
    //   window.alert("Please provide a valid gap number");
    // }
  }

   generrateNumbers(startingNumber:any , gap:any){
    this.isButtonDisabled = false;
    this.result = [];
    let Bsnum = parseInt(startingNumber);
    let Bgap = parseInt(gap);

    for (let i = 0; i < 500; i++)
    {
        this.result.push(Bsnum + Bgap);
        Bsnum += Bgap;
    }
      this.toastr.success("BarCode Numbers Genreted successfully",'',{timeOut:3000});
   }

   exportToExcel(data: any[], fileName: string): void {
    debugger
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    
    // const columnWidth = { wpx: 300 }; // Adjust the width value as needed
    // ws['A1'] = { t: 's', v: 'Sample Barcode Numbers', s: { width: columnWidth } };

    //const columnWidth = { wch: 20 }; // Adjust the width value as needed
    const columnLetter = 'A'; // Replace with the desired column letter

    ws[`!cols`] = [{ width: 25 }];
    //const numberFormat = '0.00';
    //ws[`!cols`][columnLetter.charCodeAt(0) - 'A'.charCodeAt(0)].z = numberFormat;


    const numberFormat = '0'; // Replace with the desired number format

    // Iterate through the rows and set the number format for each cell in the column
    for (let rowIndex = 2; rowIndex <= data.length + 1; rowIndex++) {
      const cellAddress = `${columnLetter}${rowIndex}`;
      const cell = ws[cellAddress];

      if (cell && cell.t === 'n') {
        cell.z = numberFormat;
      }
    }

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, `${fileName}.xlsx`);

  }

  reset(){
    this.isButtonDisabled = true;
  }
}
