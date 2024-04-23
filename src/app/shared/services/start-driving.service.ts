import { Injectable } from '@angular/core';

import { CarEngineService } from './api/car-engine.service';
import { AnimationService } from './car-animation.service';
import { PositionCalculationService } from './position-calculation.service';

@Injectable({
  providedIn: 'root',
})
export class EngineService {
  constructor(
    private carEngineService: CarEngineService,
    private positionCalculationService: PositionCalculationService,
    private animationService: AnimationService,
  ) {}

  async startDriving(id: number) {
    const car = document.getElementById(`car-${id}`) as HTMLElement;
    const flag = document.getElementById(`flag-${id}`) as HTMLElement;
    let time;
    // startButton.disabled = true;

    this.carEngineService.startCar(id).subscribe(async (startCarResponse) => {
      const { velocity, distance } = startCarResponse;
      time = Math.round(distance / velocity);

      const carModelWidthInPx = 90;
      const currentDistance = Math.floor(
        this.positionCalculationService.calculateDistance(car, flag) +
          carModelWidthInPx,
      );
      const animationData = this.animationService.animateCar(
        car,
        currentDistance,
        time,
      );

      this.carEngineService.driveCar(id).subscribe({
        next: (driveCarResponse) => {
          console.log(driveCarResponse);

          if (!driveCarResponse) {
            window.cancelAnimationFrame(animationData.id);
            const engineBrokeMessage = document.getElementById(
              `engine-broke-${id}`,
            ) as HTMLElement;
            const brokeEngine = document.getElementById(
              `car-road-${id}`,
            ) as HTMLElement;
            brokeEngine.style.backgroundColor = 'palevioletred';
            engineBrokeMessage.style.display = 'block';
            const carName =
              brokeEngine.querySelector('.car-name')?.textContent || '';
            engineBrokeMessage.innerHTML = `${carName} is out of race because the engine was broken down`;
          }
        },
      });
    });
  }
}
