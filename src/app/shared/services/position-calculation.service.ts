import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PositionCalculationService {
  // eslint-disable-next-line class-methods-use-this
  calculatePosition(element: HTMLElement): number {
    const { left, width } = element.getBoundingClientRect();
    return left + width;
  }

  calculateDistance(start: HTMLElement, finish: HTMLElement): number {
    const startPosition = this.calculatePosition(start);
    const finishPosition = this.calculatePosition(finish);
    return finishPosition - startPosition;
  }
}
