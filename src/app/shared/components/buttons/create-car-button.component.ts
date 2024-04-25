import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { EditCarDialogComponent } from '../edit-car-dialog.component';

@Component({
  imports: [MatDialogModule],
  selector: 'app-create-car-button',
  standalone: true,
  template: ` <button (click)="openEditCarDialog()">Create new car</button> `,
  styles: ``,
})
export class CreateCarButtonComponent {
  constructor(public dialog: MatDialog) {}
  openEditCarDialog() {
    this.dialog.open(EditCarDialogComponent, {});
  }
}
