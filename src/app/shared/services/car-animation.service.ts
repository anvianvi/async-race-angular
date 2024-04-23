import { Injectable, NgZone } from '@angular/core';

import { AnimationState } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  constructor(private ngZone: NgZone) {}

  animateCar(
    car: HTMLElement,
    distance: number,
    animationTime: number,
  ): AnimationState {
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

    // console.log(state);
    return state;
  }
}
