import { Injectable } from '@angular/core';

import { CarEngineService } from './api/car-engine.service';
import { AnimationService } from './car-animation.service';
import { PositionCalculationService } from './position-calculation.service';

@Injectable({
  providedIn: 'root',
})
export class CarDrivingService {
  private drivingCarStatuses = new Map<number, boolean>();
  private stopingngCarStatuses = new Map<number, boolean>();
  private brokenEngineStatuses = new Map<number, boolean>();

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

  async startDriving(id: number) {
    this.drivingCarStatuses.set(id, false);

    const car = document.getElementById(`car-${id}`) as HTMLElement;
    const flag = document.getElementById(`flag-${id}`) as HTMLElement;

    this.carEngineService.startCar(id).subscribe(async (startCarResponse) => {
      const { velocity, distance } = startCarResponse;
      const time = Math.round(distance / velocity);

      const carModelWidthInPx = 90;
      const currentDistance = Math.floor(
        PositionCalculationService.calculateDistance(car, flag) +
          carModelWidthInPx,
      );

      this.animationService.startAnimation(id, car, currentDistance, time);

      this.carEngineService.driveCar(id).subscribe({
        next: (driveCarResponse) => {
          if (!driveCarResponse) {
            this.animationService.stopAnimation(id);
            this.brokenEngineStatuses.set(id, true);
          }
        },
      });
    });

    this.stopingngCarStatuses.set(id, true);
  }

  async stopDriving(id: number) {
    this.stopingngCarStatuses.set(id, false);

    this.carEngineService.stopCar(id).subscribe({
      next: () => {
        this.animationService.stopAnimation(id);

        const car = document.getElementById(`car-${id}`);
        if (car) car.style.transform = 'translateX(0)';

        this.brokenEngineStatuses.set(id, false);
        this.animationService.stopAnimation(id);
        this.drivingCarStatuses.set(id, true);
      },
    });
  }
}
