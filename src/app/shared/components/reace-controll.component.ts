import { Component, Input, OnInit, signal } from '@angular/core';

import { Car } from '../services/api/api-types';
import { CrudWinnerService } from '../services/api/crud-winner.service';
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
export class RaceControlComponent implements OnInit {
  raceInprogress = signal(false);
  canResetRace = signal(false);

  @Input() cars!: Car[];

  constructor(
    private carDrivingService: CarDrivingService,
    private crudWinnerService: CrudWinnerService,
  ) {}

  ngOnInit(): void {
    this.resetRace();
  }

  async startRace(): Promise<{ id: number; time: number }> {
    this.raceInprogress.set(true);
    const promises: Promise<CarRaceResults>[] = this.cars.map(({ id }) =>
      this.carDrivingService.startDriving(id),
    );

    const { id, time } = await this.calculateRaceWinner(
      promises,
      this.cars.map((car) => car.id),
    );
    console.log(`i resive winner${id}${time}`);
    await this.crudWinnerService.saveWinnerResult(
      id,
      +(time / 1000).toFixed(2),
    );

    this.canResetRace.set(true);
    this.raceInprogress.set(false);

    return { id, time };
  }

  resetRace = async () => {
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
