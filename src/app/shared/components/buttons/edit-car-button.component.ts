import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Car } from '../../services/api/api-types';
import { EditCarDialogComponent } from '../edit-car-dialog.component';

@Component({
  imports: [MatDialogModule],
  selector: 'app-edit-car-button',
  standalone: true,
  template: `
    <button mat-button (click)="openEditCarDialog()">edit car</button>
  `,
  styles: `
    // ::ng-deep app-edit-car-button {
    //   margin-left: auto;
    // }
  `,
})
export class EditCarButtonComponent {
  @Input() car!: Car;

  constructor(public dialog: MatDialog) {}
  openEditCarDialog() {
    const dialogRef = this.dialog.open(EditCarDialogComponent, {
      data: this.car,
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
