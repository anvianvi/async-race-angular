import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { CarEngineService } from './api/car-engine.service';
import { AnimationService } from './car-animation.service';
import { DriveSubscriptionsService } from './drive-subscriptions.servisec';
import { CarRaceResults } from './types';

@Injectable({
  providedIn: 'root',
})
export class CarDrivingService {
  private IsCarInDrivingModeStatuses = new Map<number, boolean>();
  private IsCarInStopingModeStatuses = new Map<number, boolean>();
  private brokenEngineStatuses = new Map<number, boolean>();

  driveCarSubscriptions: { [key: number]: Subscription } = {};

  constructor(
    private carEngineService: CarEngineService,
    private animationService: AnimationService,
    private driveSubscriptionsService: DriveSubscriptionsService,
  ) {}

  canTurnCarInDriving(id: number): boolean {
    return this.IsCarInDrivingModeStatuses.get(id) ?? true;
  }
  canStopCar(id: number): boolean {
    return this.IsCarInStopingModeStatuses.get(id) ?? true;
  }
  isAnyCarInDrivingMode(): boolean {
    return Array.from(this.IsCarInDrivingModeStatuses.values()).some(
      (status) => !status,
    );
  }

  isEngineBroken(id: number): boolean {
    return this.brokenEngineStatuses.get(id) ?? false;
  }

  startDriving(id: number): Observable<CarRaceResults> {
    this.IsCarInDrivingModeStatuses.set(id, false);
    return new Observable<CarRaceResults>((observer) => {
      this.carEngineService.startOrStopEngine(id, 'started').subscribe({
        next: (response) => {
          const { velocity, distance } = response;
          const time = Math.round(distance / velocity);

          this.animationService.startAnimation(id, time);
          this.IsCarInStopingModeStatuses.set(id, false);

          const subscription = this.carEngineService.driveCar(id).subscribe({
            next: (success) => {
              if (!success) {
                this.animationService.stopAnimation(id);
                this.brokenEngineStatuses.set(id, true);
              }
              observer.next({ success, id, time });
            },
            complete: () => {
              observer.complete();
            },
          });
          this.driveSubscriptionsService.add(id, subscription);
        },
        error: (err) => {
          observer.error(err);
        },
      });
    });
  }

  async stopDriving(id: number) {
    this.IsCarInStopingModeStatuses.set(id, true);

    this.driveSubscriptionsService.unsubscribe(id);

    this.animationService.stopAnimation(id);
    const car = document.getElementById(`car-${id}`);
    if (car) car.style.transform = 'translateX(0)';

    this.brokenEngineStatuses.set(id, false);

    this.carEngineService.startOrStopEngine(id, 'stopped').subscribe({
      complete: () => {
        this.IsCarInDrivingModeStatuses.set(id, true);
      },
    });
  }
}
