import { Component, Input, signal } from '@angular/core';

import { Car } from '../services/api/api-types';
import { CarDrivingService } from '../services/car-driving.service';
import { CarRaceResults } from '../services/types';

@Component({
  selector: 'app-race-control',
  standalone: true,
  template: `<div class="">
    <button (click)="startRace()" [disabled]="raceInprogress()">
      Start Race
    </button>
    <button (click)="resetRace()" [disabled]="!canResetRace()">
      Reset Race
    </button>
  </div> `,
  styles: ``,
})
export class RaceControlComponent {
  raceInprogress = signal(false);
  canResetRace = signal(false);

  @Input() cars!: Car[];

  constructor(private carDrivingService: CarDrivingService) {}

  async startRace(): Promise<Car | null> {
    this.raceInprogress.set(true);
    const promises: Promise<CarRaceResults>[] = this.cars.map(({ id }) =>
      this.carDrivingService.startDriving(id),
    );
    this.canResetRace.set(true);

    const winner = await this.calculateRaceWinner(
      promises,
      this.cars.map((car) => car.id),
    );
    this.raceInprogress.set(false);

    return winner;
  }

  resetRace = async () => {
    // resetButton?.addEventListener('click', async () => {
    //   const startRaceButton = document.getElementById(
    //     'race',
    //   ) as HTMLButtonElement;
    //   const winnerMessage = document.getElementById('winner-mesage');
    //   winnerMessage?.classList.remove('display');
    this.canResetRace.set(true);
    this.raceInprogress.set(true);

    this.cars.forEach(({ id }) => {
      this.carDrivingService.stopDriving(id);
    });

    this.canResetRace.set(false);
    this.raceInprogress.set(false);
  };

  calculateRaceWinner = async (
    promises: Promise<CarRaceResults>[],
    ids: number[],
  ): Promise<Car | null> => {
    const { success, id, time } = await Promise.race(promises);
    if (!success) {
      const failedIndex = ids.findIndex((index: number) => index === id);
      promises.splice(failedIndex, 1);
      ids.splice(failedIndex, 1);
      if (promises.length < 1) return null;
      return this.calculateRaceWinner(promises, ids);
    }
    console.log('winner is -> ');
    console.log(time, id, success);
    // const winnerCar = store.cars.find((car) => car.id === id);
    return id as unknown as Car;
  };
}
