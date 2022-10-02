import { Pipe, PipeTransform } from '@angular/core';

import { IProduct } from '../interfaces/product.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: IProduct[], searchText: string): IProduct[] {
    value = value.filter(text => text.title.toLowerCase().includes(searchText.trim()))
    return value;
  }

}
