import { Component, computed, Input } from '@angular/core';

import { CarDrivingService } from '../../services/car-driving.service';
import { RaceProcessService } from '../../services/race-process.service';

@Component({
  selector: 'app-stop-driving-button',
  standalone: true,
  template: `<button
    id="stop-engine-car-{{ id }}"
    (click)="stopDriving(id)"
    [disabled]="raceInprogress() || !canStopDriving(id)"
  >
    Stop Ride
  </button>`,
  styles: ``,
})
export class StopDrivingButtonComponent {
  raceInprogress = computed(() => {
    return this.raceService.raceInprogress();
  });
  constructor(
    private carDrivingService: CarDrivingService,
    private raceService: RaceProcessService,
  ) {}

  @Input() id!: number;

  canStopDriving(id: number): boolean {
    return this.carDrivingService.canStopCar(id);
  }

  stopDriving(id: number) {
    this.carDrivingService.stopDriving(id);
  }
}
