import { computed, Injectable, signal } from '@angular/core';
import {
  filter,
  from,
  mergeMap,
  Subject,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

import { Car } from './api/api-types';
import { GetCarsService } from './api/get-cars.service';
import { CarDrivingService } from './car-driving.service';
import { DriveSubscriptionsService } from './drive-subscriptions.servisec';
import { SetWinnerService } from './set-winner.service';

@Injectable({
  providedIn: 'root',
})
export class RaceProcessService {
  raceInprogress = signal(false);
  canResetRace = signal(false);
  displayCurrentWinner = signal(false);

  cars = computed(() => {
    return this.getCarsService.carsInGarage();
  });

  constructor(
    private carDrivingService: CarDrivingService,
    private setWinnerService: SetWinnerService,
    private getCarsService: GetCarsService,
    private driveSubscriptionsService: DriveSubscriptionsService,
  ) {}

  startRaceProcess(cars: Car[]) {
    this.raceInprogress.set(true);
    const winnerFound$ = new Subject<void>();

    const returns = cars.map(({ id }) =>
      this.carDrivingService.startDriving(id),
    );

    from(returns)
      .pipe(
        mergeMap((obs$) =>
          obs$.pipe(
            tap((result) => {
              if (result.success) {
                const resultTime = Number((result.time / 1000).toFixed(2));
                this.setWinnerService.setWinner(result.id, resultTime);
                this.displayCurrentWinner.set(true);
                winnerFound$.next();
              }
            }),
            filter(({ success }) => success),
            takeUntil(winnerFound$),
          ),
        ),
      )
      .subscribe();

    timer(2000)
      .pipe(take(1))
      .subscribe(() => {
        this.canResetRace.set(true);
      });

    this.raceInprogress.set(false);
  }

  resetRace = async () => {
    this.raceInprogress.set(true);
    this.canResetRace.set(false);

    const racers = this.cars();

    this.driveSubscriptionsService.unsubscribeAll();

    racers.forEach(({ id }) => {
      this.carDrivingService.stopDriving(id);
    });

    this.displayCurrentWinner.set(false);
    timer(3000)
      .pipe(take(1))
      .subscribe(() => {
        this.raceInprogress.set(false);
      });
  };
}
