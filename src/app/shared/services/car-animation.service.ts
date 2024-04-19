import { Injectable } from '@angular/core';

import { AnimationState } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  // eslint-disable-next-line class-methods-use-this
  animateCar(
    car: HTMLElement,
    distance: number,
    animationTime: number,
  ): AnimationState {
    console.log(animationTime);
    console.log(distance);

    const state: AnimationState = { id: 0 };
    const startTime = performance.now();

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

    return state;
  }
}
