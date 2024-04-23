import { Component, Input } from '@angular/core';

import { CarDrivingService } from '../services/car-driving.service';

@Component({
  selector: 'app-start-driving-button',
  standalone: true,
  template: `<button id="start-engine-car-{{ id }}" (click)="startDriving(id)">
    Start Ride
  </button>`,
})
export class StartDrivingButtonComponent {
  constructor(private carDrivingService: CarDrivingService) {}

  @Input() id!: number;

  startDriving(id: number) {
    this.carDrivingService.startDriving(id);
  }
}
