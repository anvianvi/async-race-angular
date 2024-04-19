import { Component, Input } from '@angular/core';

import { EngineService } from '../services/start-driving.service';

@Component({
  selector: 'app-start-driving-button',
  standalone: true,
  template: `<button (click)="startDriving(id)">Start Ride</button>`,
})
export class StartDrivingButtonComponent {
  constructor(private engineService: EngineService) {}

  @Input() id!: number;

  startDriving(id: number) {
    this.engineService.startDriving(id);
  }
}
