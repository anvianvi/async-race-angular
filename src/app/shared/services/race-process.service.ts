import { computed, Injectable, signal } from '@angular/core';

import { Car } from './api/api-types';
import { CrudWinnerService } from './api/crud-winner.service';
import { GetCarsService } from './api/get-cars.service';
import { CarDrivingService } from './car-driving.service';
import { CarRaceResults } from './types';

@Injectable({
  providedIn: 'root',
})
export class RaceProcessService {
  raceInprogress = signal(false);
  canResetRace = signal(false);
  displayCurrentWinner = signal(false);
  currentWinnersId = signal<number>(-1);
  currentWinnersTime = signal<number>(-1);

  cars = computed(() => {
    return this.getCarsService.carsInGarage();
  });

  constructor(
    private carDrivingService: CarDrivingService,
    private crudWinnerService: CrudWinnerService,
    private getCarsService: GetCarsService,
  ) {}

  async startRaceProcess(cars: Car[]): Promise<{ id: number; time: number }> {
    this.raceInprogress.set(true);
    const promises: Promise<CarRaceResults>[] = cars.map(({ id }) =>
      this.carDrivingService.startDriving(id),
    );

    const { id, time } = await this.calculateRaceWinner(
      promises,
      cars.map((car) => car.id),
    );
    await this.crudWinnerService.saveWinnerResult(
      id,
      +(time / 1000).toFixed(2),
    );

    this.currentWinnersId.set(id);
    this.currentWinnersTime.set(+(time / 1000).toFixed(2));

    this.displayCurrentWinner.set(true);
    this.canResetRace.set(true);
    this.raceInprogress.set(false);

    return { id, time };
  }

  resetRace = async () => {
    this.canResetRace.set(true);
    this.raceInprogress.set(true);

    const racers = this.cars();

    racers.forEach(({ id }) => {
      this.carDrivingService.stopDriving(id);
    });

    this.canResetRace.set(false);
    this.raceInprogress.set(false);
    this.displayCurrentWinner.set(false);
  };

  calculateRaceWinner = async (
    promises: Promise<CarRaceResults>[],
    ids: number[],
  ): Promise<{ id: number; time: number }> => {
    const { success, id, time } = await Promise.race(promises);
    if (!success) {
      const failedIndex = ids.findIndex((index: number) => index === id);
      promises.splice(failedIndex, 1);
      ids.splice(failedIndex, 1);
      // if (promises.length < 1) break;
      return this.calculateRaceWinner(promises, ids);
    }

    return { id, time };
  };
}
