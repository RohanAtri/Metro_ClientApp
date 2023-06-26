import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountFormater'
})
export class AmountFormaterPipe implements PipeTransform {

  transform(value: any, ...args: any): unknown {
    // debugger
    if (typeof value == 'number' && value && !args[0].placeHolderName.includes('%')) {
      let amount: any = value;
      let numberLength = 3;
      if (amount < 0) {
        amount = amount * -1;
      }
      if (amount > 1000) {
        numberLength = 2;
      } else if (amount > 100) {
        numberLength = 3;
      } else if (amount > 10) {
        numberLength = 4;
      } else {
        numberLength = 5;
      }
      amount = (amount / 100000).toFixed(numberLength);
      return value < 0 ? '-' + amount : amount;
    }
    else {
      return value ? value : '';
    }
  }

}
