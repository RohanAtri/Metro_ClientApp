import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundUp'
})
export class RoundUpPipe implements PipeTransform {

  transform(value: number): unknown {
    return Math.ceil(value);
  }

}
