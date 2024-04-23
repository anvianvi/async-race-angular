import { Injectable } from '@angular/core';

import { CarEngineService } from './api/car-engine.service';
import { AnimationService } from './car-animation.service';
import { PositionCalculationService } from './position-calculation.service';

@Injectable({
  providedIn: 'root',
})
export class CarDrivingService {
  constructor(
    private carEngineService: CarEngineService,
    private positionCalculationService: PositionCalculationService,
    private animationService: AnimationService,
  ) {}

  async startDriving(id: number) {
    const car = document.getElementById(`car-${id}`) as HTMLElement;
    const flag = document.getElementById(`flag-${id}`) as HTMLElement;
    const startButton = document.getElementById(
      `start-engine-car-${id}`,
    ) as HTMLButtonElement;
    const stopButton = document.getElementById(
      `stop-engine-car-${id}`,
    ) as HTMLButtonElement;

    startButton.disabled = true;

    this.carEngineService.startCar(id).subscribe(async (startCarResponse) => {
      const { velocity, distance } = startCarResponse;
      const time = Math.round(distance / velocity);

      const carModelWidthInPx = 90;
      const currentDistance = Math.floor(
        this.positionCalculationService.calculateDistance(car, flag) +
          carModelWidthInPx,
      );

      this.animationService.startAnimation(id, car, currentDistance, time);

      this.carEngineService.driveCar(id).subscribe({
        next: (driveCarResponse) => {
          if (!driveCarResponse) {
            this.animationService.stopAnimation(id);
            const engineBrokeMessage = document.getElementById(
              `engine-broke-${id}`,
            ) as HTMLElement;
            engineBrokeMessage.style.display = 'block';
          }
        },
      });
    });

    stopButton.disabled = false;
  }

  async stopDriving(id: number) {
    this.animationService.stopAnimation(id);

    const startButton = document.getElementById(
      `start-engine-car-${id}`,
    ) as HTMLButtonElement;
    const stopButton = document.getElementById(
      `stop-engine-car-${id}`,
    ) as HTMLButtonElement;
    const engineBrokeMessage = document.getElementById(
      `engine-broke-${id}`,
    ) as HTMLElement;

    stopButton.disabled = true;
    this.carEngineService.stopCar(id).subscribe({
      next: () => {
        this.animationService.stopAnimation(id);
        const car = document.getElementById(`car-${id}`);
        if (car) car.style.transform = 'translateX(0)';
        engineBrokeMessage.style.display = 'none';
        startButton.disabled = false;
      },
    });
  }
}
