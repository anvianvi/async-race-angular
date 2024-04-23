import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PositionCalculationService {
  static calculatePosition = (element: HTMLElement): number => {
    const { left, width } = element.getBoundingClientRect();
    return left + width;
  };

  static calculateDistance(start: HTMLElement, finish: HTMLElement): number {
    const startPosition = PositionCalculationService.calculatePosition(start);
    const finishPosition = PositionCalculationService.calculatePosition(finish);
    return finishPosition - startPosition;
  }
}
