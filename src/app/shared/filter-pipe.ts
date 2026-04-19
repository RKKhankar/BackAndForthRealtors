import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(properties: any[], searchText: string): any[] {
    if (!properties || !searchText) {
      return properties;
    }

    return properties.filter(p =>
      p.location.toLowerCase().includes(searchText.toLowerCase())
    );
  }

}