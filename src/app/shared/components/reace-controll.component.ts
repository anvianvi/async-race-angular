import { Component, computed, Input, OnInit } from '@angular/core';

import { Car } from '../services/api/api-types';
import { RaceProcessService } from '../services/race-process.service';

@Component({
  selector: 'app-race-control',
  standalone: true,
  template: `<div class="">
    <button (click)="startRace()" [disabled]="raceInprogress()">
      Start Race
    </button>
    <button (click)="stopRace()" [disabled]="!canResetRace()">
      Reset Race
    </button>
  </div> `,
  styles: ``,
})
export class RaceControlComponent implements OnInit {
  canResetRace = computed(() => {
    return this.raceService.canResetRace();
  });

  raceInprogress = computed(() => {
    return this.raceService.raceInprogress();
  });
  @Input() cars!: Car[];

  constructor(private raceService: RaceProcessService) {}

  ngOnInit(): void {
    this.raceService.resetRace();
  }
  startRace() {
    this.raceService.startRaceProcess(this.cars);
  }
  stopRace() {
    this.raceService.resetRace();
  }
}
