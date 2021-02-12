import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkPhoneNumber'
})
export class CheckPhoneNumberPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return !isNaN(value) ? value : 'NA';
  }

}
