import { Component, computed, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { CarDrivingService } from '../../services/car-driving.service';
import { RaceProcessService } from '../../services/race-process.service';

@Component({
  imports: [MatButtonModule, MatIconModule, MatTooltip],

  selector: 'app-start-driving-button',
  standalone: true,
  template: `
    <button
      [disabled]="!canStartDriving(id) || raceInprogress()"
      mat-icon-button
      matTooltip="Start demo ride for this car"
      class="start-drive-car-button"
      id="start-engine-car-{{ id }}"
      (click)="startDriving(id)"
    >
      <mat-icon>play_arrow</mat-icon>
    </button>
  `,
  styles: `
    .start-drive-car-button {
      color: white;
      &:hover {
        color: green;
      }
      &:disabled {
        color: #0c2637;
      }
    }
  `,
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
