import { Injectable } from '@angular/core';

import { CarEngineService } from './api/car-engine.service';
import { AnimationService } from './car-animation.service';
import { PositionCalculationService } from './position-calculation.service';

@Injectable({
  providedIn: 'root', // Provide this service in the root injector
})
export class EngineService {
  constructor(
    private carEngineService: CarEngineService,
    private positionCalculationService: PositionCalculationService,
    private animationService: AnimationService,
  ) {}

  async startDriving(id: number): Promise<{ success: boolean; id: number }> {
    // Get DOM elements
    const car = document.getElementById(`car-${id}`) as HTMLElement;
    const flag = document.getElementById(`flag-${id}`) as HTMLElement;
    let time;

    // startButton.disabled = true;

    // Start the car and get velocity and distance
    this.carEngineService.startCar(id).subscribe((response) => {
      const { velocity, distance } = response;
      time = Math.round(distance / velocity);

      const carModelWidthInPx = 90;
      const currentDistance = Math.floor(
        this.positionCalculationService.calculateDistance(car, flag) +
          carModelWidthInPx,
      );
      this.animationService.animateCar(car, currentDistance, time);
    });

    // Enable stop button
    // stopButton.disabled = false;

    // // Calculate current distance
    // const carModelWidthInPx = 90;
    // const currentDistance = Math.floor(
    //   this.positionCalculationService.calculateDistance(car, flag) +
    //     carModelWidthInPx,
    // );

    // // Start animation
    // const animationData = this.animationService.animateCar(
    //   car,
    //   currentDistance,
    //   time,
    // );
    // console.log(animationData);
    // // store.animation[id] = animationData;

    // // Drive the car
    // const driveData = await driveCar(id);
    // const { success } = driveData;

    // // Handle engine breakdown
    // if (!success) {
    //   window.cancelAnimationFrame(animationData.id);
    //   engineBrokeMessage.style.display = 'block';
    //   const carName =
    //     engineBrokeMessage.querySelector('.car-name')?.textContent || '';
    //   engineBrokeMessage.innerHTML = `${carName} is out of race because the engine was broken down`;
    // }
    const success = true;
    return { success, id };
  }
}
