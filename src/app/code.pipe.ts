import { Pipe, PipeTransform } from '@angular/core';

import { StorageService } from './storage.service';

@Pipe({
  name: 'codePipe',
})
export class CodePipe implements PipeTransform {
  private charMap;
  private grid: any;

  constructor(storageService: StorageService) {
    this.charMap = storageService.charMap;
    storageService.grid.subscribe((serviceGrid) => (this.grid = serviceGrid));
  }

  transform(value: string): string {
    if (!value) {
      return '00';
    }
    const firstSecond = value[0];
    const secSecond = value[1];

    const firstChar = this.grid[firstSecond][secSecond];
    const secondChar = this.grid[secSecond][firstSecond];

    const firstCount = this.charMap.get(firstChar);
    const secondCount = this.charMap.get(secondChar);

    let finalCode = '';
    if (firstCount > 9) {
      finalCode += Math.ceil(firstCount / Math.ceil(firstCount / 9));
    } else {
      finalCode += firstCount;
    }

    if (secondCount > 9) {
      finalCode += Math.ceil(
        Math.ceil(secondCount / Math.ceil(secondCount / 9))
      );
    } else {
      finalCode += secondCount;
    }

    return finalCode;
  }
}
