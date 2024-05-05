import { Component, computed, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { CarDrivingService } from '../../services/car-driving.service';
import { RaceProcessService } from '../../services/race-process.service';

@Component({
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatTooltip],

  selector: 'app-start-driving-button',
  standalone: true,
  template: `
    <button
      mat-icon-button
      disabledInteractive
      matTooltip="Start demo ride for this car"
      class="start-drive-car-button"
      id="start-engine-car-{{ id }}"
      (click)="startDriving(id)"
      [disabled]="!canStartDriving(id) || raceInprogress()"
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
