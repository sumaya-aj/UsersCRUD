import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeTimeFromDate'
})
export class RemoveTimeFromDatePipe implements PipeTransform {

  transform(value: Date): string {
    var x = new Date(value);
    var y = new Date(x.getFullYear(), x.getMonth(), x.getDate());
    return y.toLocaleDateString(); // 5/4/2024	
  }

}
