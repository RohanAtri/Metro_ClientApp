import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value?.filter((val:any) => {
      let rVal = (val.showroomName.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }

}
