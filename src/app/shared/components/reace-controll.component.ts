import { Component, computed, Input, OnInit } from '@angular/core';

import { Car } from '../services/api/api-types';
import { CarDrivingService } from '../services/car-driving.service';
import { RaceProcessService } from '../services/race-process.service';

@Component({
  selector: 'app-race-control',
  standalone: true,
  template: `<div class="race-buttons-container">
    <button
      class="race-button"
      (click)="startRace()"
      [disabled]="raceInprogress() || isAnyCarInDrivingMode()"
    >
      Start Race
    </button>

    <button
      class="race-button"
      (click)="stopRace()"
      [disabled]="!canResetRace()"
    >
      Reset Race
    </button>
  </div> `,
  styles: `
    .race-buttons-container {
      display: flex;
      gap: 10px;
    }
    .race-button {
      padding: 10px;
      border-radius: 15px;
      cursor: pointer;
    }
  `,
})
export class RaceControlComponent implements OnInit {
  canResetRace = computed(() => {
    return this.raceService.canResetRace();
  });

  raceInprogress = computed(() => {
    return this.raceService.raceInprogress();
  });

  @Input() cars!: Car[];

  constructor(
    private raceService: RaceProcessService,
    private carDrivingService: CarDrivingService,
  ) {}

  ngOnInit(): void {
    this.raceService.resetRace();
  }
  startRace() {
    this.raceService.startRaceProcess(this.cars);
  }
  stopRace() {
    this.raceService.resetRace();
  }
  isAnyCarInDrivingMode(): boolean {
    return this.carDrivingService.isAnyCarInDrivingMode();
  }
}
