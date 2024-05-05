import { Component, computed, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { CarDrivingService } from '../../services/car-driving.service';
import { RaceProcessService } from '../../services/race-process.service';

@Component({
  imports: [MatButtonModule, MatIconModule, MatTooltip],
  selector: 'app-stop-driving-button',
  standalone: true,
  template: ` <button
    [disabled]="!raceInprogress() || !canStopDriving(id)"
    mat-icon-button
    matTooltip="Stop ride of this car"
    class="stop-drive-car-button"
    id="stop-engine-car-{{ id }}"
    (click)="stopDriving(id)"
  >
    <mat-icon>stop</mat-icon>
  </button>`,
  styles: `
    .stop-drive-car-button {
      color: white;
      &:hover {
        color: orange;
      }
      &:disabled {
        color: #0c2637;
      }
    }
  `,
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
