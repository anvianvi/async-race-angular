import { Injectable } from '@angular/core';
import {
  catchError,
  finalize,
  firstValueFrom,
  map,
  of,
  Subscription,
} from 'rxjs';

import { CarEngineService } from './api/car-engine.service';
import { AnimationService } from './car-animation.service';
import { CarRaceResults } from './types';

@Injectable({
  providedIn: 'root',
})
export class CarDrivingService {
  private drivingCarStatuses = new Map<number, boolean>();
  private stopingngCarStatuses = new Map<number, boolean>();
  private brokenEngineStatuses = new Map<number, boolean>();
  driveCarSubscriptions: { [key: number]: Subscription } = {};

  constructor(
    private carEngineService: CarEngineService,
    private animationService: AnimationService,
  ) {}

  canStartCar(id: number): boolean {
    return this.drivingCarStatuses.get(id) ?? true;
  }

  canStopCar(id: number): boolean {
    return this.stopingngCarStatuses.get(id) ?? false;
  }

  isEngineBroken(id: number): boolean {
    return this.brokenEngineStatuses.get(id) ?? false;
  }

  async startDriving(id: number): Promise<CarRaceResults> {
    this.drivingCarStatuses.set(id, false);

    const results = this.carEngineService.startOrStopEngine(id, 'started').pipe(
      map((response) => ({
        velocity: response.velocity,
        distance: response.distance,
      })),
    );

    const { velocity, distance } = await firstValueFrom(results);
    const time = Math.round(distance / velocity);

    this.animationService.startAnimation(id, time);
    this.stopingngCarStatuses.set(id, true);

    const { success } = await firstValueFrom(
      this.carEngineService.driveCar(id),
    );

    if (!success) {
      this.animationService.stopAnimation(id);
      this.brokenEngineStatuses.set(id, true);
    }

    return { success, id, time };
  }

  async stopDriving(id: number) {
    this.stopingngCarStatuses.set(id, false);

    this.carEngineService
      .startOrStopEngine(id, 'stopped')
      .pipe(
        catchError(() => {
          return of(null);
        }),
        finalize(() => {
          this.animationService.stopAnimation(id);

          const car = document.getElementById(`car-${id}`);
          if (car) car.style.transform = 'translateX(0)';

          this.brokenEngineStatuses.set(id, false);
          this.animationService.stopAnimation(id);
          this.drivingCarStatuses.set(id, true);
        }),
      )
      .subscribe();
  }
}
