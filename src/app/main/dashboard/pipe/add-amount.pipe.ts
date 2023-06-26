import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addAmount'
})
export class AddAmountPipe implements PipeTransform {

  acceptKeys: string[] = [
    "Company",
    "Gender",
    "Brand Type",	
    "Category",
    "Sub Category",	
    "Ag",
    "Brand Name"
  ];


  transform(value: any, args: any[]) {
    if (!this.acceptKeys.includes(value.placeHolderName)) {
      const filterData = args.filter(x => x.companyId && !x.genderId && !x.brandtypeId && !x.categoryId && !x.subcategoryId && !x.agId && !x.brandnameId)
      let sum = 0;
      filterData.forEach(element => {
        if (element[value.propName]) {
          sum = sum + parseFloat(element[value.propName]);
        }
      });
      return sum;
    } else {
      return '-';
    }
  }
}
