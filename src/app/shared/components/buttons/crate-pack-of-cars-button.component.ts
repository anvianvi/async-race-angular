import { Component, signal } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';

import { CrudCarService } from '../../services/api/crud-car.service';
import { GetCarsService } from '../../services/api/get-cars.service';
import { RandomGeneratorsService } from '../../services/random-generators.service';

@Component({
  selector: 'app-create-pack-of-cars-button',
  standalone: true,
  template: ` <button
    [disabled]="!generationEnabled()"
    (click)="generateCars()"
  >
    Generate 100 New Cars
  </button>`,
  styles: ``,
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
