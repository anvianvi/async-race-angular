import { Injectable, NgZone } from '@angular/core';

export type AnimationState = {
  id: number;
};

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private animations: AnimationState[] = [];

  constructor(private ngZone: NgZone) {}

  startAnimation(
    carId: number,
    car: HTMLElement,
    distance: number,
    animationTime: number,
  ): void {
    const state: AnimationState = { id: 0 };
    const startTime = performance.now();

    this.ngZone.runOutsideAngular(() => {
      function animate(currentTime: number) {
        const elapsedTime = currentTime - startTime;
        const passedDistance = Math.round(
          (elapsedTime / animationTime) * distance,
        );
        const carStyle = car.style;
        carStyle.transform = `translateX(${Math.min(passedDistance, distance)}px)`;

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
