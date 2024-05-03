import { computed, Injectable, signal } from '@angular/core';

import { CrudWinnerService } from './api/crud-winner.service';
import { GetCarsService } from './api/get-cars.service';
import { Winner } from './api/get-winners.service';

@Injectable({
  providedIn: 'root',
})
export class SetWinnerService {
  curentWinner = signal<Winner>({
    id: 0,
    time: 0,
    car: {
      color: '',
      name: '',
    },
  });

  cars = computed(() => {
    return this.getCarsService.carsInGarage();
  });

  constructor(
    private getCarsService: GetCarsService,
    private crudWinnerService: CrudWinnerService,
  ) {}

  setWinner(id: number, time: number) {
    const winnersCar = this.cars()[id - 1];
    const curentWinner: Winner = {
      id,
      time,
      car: {
        color: winnersCar.color,
        name: winnersCar.name,
      },
    };
    this.curentWinner.set(curentWinner);
    this.crudWinnerService.saveWinnerResult(id, time);
  }
}
