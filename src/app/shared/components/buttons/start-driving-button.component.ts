import { Component, computed, Input } from '@angular/core';

import { CarDrivingService } from '../../services/car-driving.service';
import { RaceProcessService } from '../../services/race-process.service';

@Component({
  selector: 'app-start-driving-button',
  standalone: true,
  template: `<button
    id="start-engine-car-{{ id }}"
    (click)="startDriving(id)"
    [disabled]="!canStartDriving(id) || raceInprogress()"
  >
    Start Ride
  </button>`,
})
export class StartDrivingButtonComponent {
  constructor(
    private carDrivingService: CarDrivingService,
    private raceService: RaceProcessService,
  ) {}

  raceInprogress = computed(() => {
    return this.raceService.raceInprogress();
  });

  @Input() id!: number;

  canStartDriving(id: number): boolean {
    return this.carDrivingService.canTurnCarInDriving(id);
  }

  startDriving(id: number) {
    this.carDrivingService.startDriving(id).subscribe();
  }
}
