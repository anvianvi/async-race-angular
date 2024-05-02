import { Injectable, NgZone } from '@angular/core';

import { PositionCalculationService } from './position-calculation.service';

export type AnimationState = {
  id: number;
};

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private animations: AnimationState[] = [];

  constructor(private ngZone: NgZone) {}

  startAnimation(carId: number, animationTime: number): void {
    const car = document.getElementById(`car-${carId}`) as HTMLElement;
    const flag = document.getElementById(`flag-${carId}`) as HTMLElement;

    const carModelWidthInPx = 90;
    const distanceToRide = Math.floor(
      PositionCalculationService.calculateDistance(car, flag) +
        carModelWidthInPx,
    );

    const state: AnimationState = { id: 0 };
    const startTime = performance.now();

    this.ngZone.runOutsideAngular(() => {
      function animate(currentTime: number) {
        const elapsedTime = currentTime - startTime;
        const passedDistance = Math.round(
          (elapsedTime / animationTime) * distanceToRide,
        );
        const carStyle = car.style;
        carStyle.transform = `translateX(${Math.min(passedDistance, distanceToRide)}px)`;

        if (elapsedTime < animationTime) {
          state.id = window.requestAnimationFrame(animate);
        }
      }

      state.id = window.requestAnimationFrame(animate);
    });

    this.animations[carId] = state;
  }

  stopAnimation(carId: number) {
    window.cancelAnimationFrame(this.animations[carId].id);
  }
}
