import { Component } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent {

  constructor(private service: StorageService) {
    this.service.code.subscribe((serviceCode) => {
      this.code = serviceCode;
    });
    this.service.grid.subscribe((serviceGrid) => (this.grid = serviceGrid));
  }
  public character!: string;

  public grid!: string[][];

  public code: any;

  /**
   * Generates a new grid on the service and resets the character on the inputs
   */
  public generateGrid(): void {
    this.service.generateGrid(this.character);
    this.character = '';
  }
}
