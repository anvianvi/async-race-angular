import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { finalize, forkJoin } from 'rxjs';

import { CrudCarService } from '../../services/api/crud-car.service';
import { GetCarsService } from '../../services/api/get-cars.service';
import { RandomGeneratorsService } from '../../services/random-generators.service';

@Component({
  imports: [MatButtonModule, MatIconModule, MatTooltip],
  selector: 'app-create-pack-of-cars-button',
  standalone: true,
  template: `
    <button
      mat-button
      class="add-pack-button"
      matTooltip="Add 100 new cars to the garage"
      [disabled]="!generationEnabled()"
      (click)="generateCars()"
    >
      <mat-icon>library_add</mat-icon>
    </button>
  `,
  styles: `
    .mat-mdc-button:not(:disabled) {
      color: white;
    }
    .add-pack-button {
      color: white;
      &:hover {
        color: greenyellow;
      }
      &:disabled {
        color: #0c2637;
      }
    }
  `,
})
export class GeneratePackOfCarsButtonComponent {
  generationEnabled = signal(true);
  countOfCarsNeededToGenereteOnClickAcordingToRequirements = 100;
  count = this.countOfCarsNeededToGenereteOnClickAcordingToRequirements;

  constructor(
    private generateService: RandomGeneratorsService,
    private crudCarService: CrudCarService,
    private getCarsService: GetCarsService,
  ) {}

  generateCars() {
    this.generationEnabled.set(false);
    const cars = this.generateService.getRandomCarTemplate(this.count);

    const createCarObservables = cars.map((car) =>
      this.crudCarService.createCar(car),
    );

    forkJoin(createCarObservables)
      .pipe(
        finalize(() => {
          this.getCarsService.getCars();
          this.generationEnabled.set(true);
        }),
      )
      .subscribe();
  }
}
