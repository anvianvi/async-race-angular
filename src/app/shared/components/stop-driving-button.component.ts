import { Component, Input } from '@angular/core';

import { CarDrivingService } from '../services/car-driving.service';

@Component({
  selector: 'app-stop-driving-button',
  standalone: true,
  template: `<button
    id="stop-engine-car-{{ id }}"
    (click)="stopDriving(id)"
    [disabled]="!canStopDriving(id)"
  >
    Stop Ride
  </button>`,
  styles: ``,
})
export class StopDrivingButtonComponent {
  constructor(private carDrivingService: CarDrivingService) {}

  @Input() id!: number;

  canStopDriving(id: number): boolean {
    return this.carDrivingService.canStopCar(id);
  }

  stopDriving(id: number) {
    this.carDrivingService.stopDriving(id);
  }
}
