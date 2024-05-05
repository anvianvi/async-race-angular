import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { EditCarDialogComponent } from '../edit-car-dialog.component';

@Component({
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatTooltip],
  selector: 'app-create-car-button',
  standalone: true,
  template: `
    <button
      mat-button
      class="create-car-button"
      color="primary"
      matTooltip="Add new car to the garage"
      (click)="openEditCarDialog()"
    >
      <mat-icon>add</mat-icon>
    </button>
  `,
  styles: `
    .mat-mdc-button:not(:disabled) {
      color: white;
    }
    .create-car-button {
      color: white;
      &:hover {
        color: greenyellow;
      }
      &:disabled {
        color: #0c2637;
      }
    }
  `,
})
export class CreateCarButtonComponent {
  constructor(public dialog: MatDialog) {}
  openEditCarDialog() {
    this.dialog.open(EditCarDialogComponent, {});
  }
}
