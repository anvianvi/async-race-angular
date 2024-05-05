import { Component, computed, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { Car } from '../../services/api/api-types';
import { CarDrivingService } from '../../services/car-driving.service';
import { RaceProcessService } from '../../services/race-process.service';
import { EditCarDialogComponent } from '../edit-car-dialog.component';

@Component({
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatTooltip],
  selector: 'app-edit-car-button',
  standalone: true,
  template: `<button
    class="edit-car-button"
    mat-icon-button
    matTooltip="Edit this car"
    (click)="openEditCarDialog()"
    [disabled]="!isCarInDriving(car.id) || raceInprogress()"
  >
    <mat-icon>edit</mat-icon>
  </button> `,
  styles: `
    .edit-car-button {
      color: white;
      &:hover {
        color: yellow;
      }
    }
  `,
})
export class EditCarButtonComponent {
  @Input() car!: Car;

  constructor(
    public dialog: MatDialog,
    private raceService: RaceProcessService,
    private carDrivingService: CarDrivingService,
  ) {}

  raceInprogress = computed(() => {
    return this.raceService.raceInprogress();
  });

  isCarInDriving(id: number): boolean {
    return this.carDrivingService.canTurnCarInDriving(id);
  }

  openEditCarDialog() {
    this.dialog.open(EditCarDialogComponent, {
      data: this.car,
    });
  }
}
