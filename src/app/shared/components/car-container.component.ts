import { Component, Input } from '@angular/core';

import { Car } from '../services/api/api-types';
import { CarDrivingService } from '../services/car-driving.service';
import { EditCarButtonComponent } from './buttons/edit-car-button.component';
import { RemoveCarButtonComponent } from './buttons/remove-car-button.component';
import { StartDrivingButtonComponent } from './buttons/start-driving-button.component';
import { StopDrivingButtonComponent } from './buttons/stop-driving-button.component';
import { CarImageComponent } from './car-image.component';

@Component({
  selector: 'app-car-container',
  standalone: true,
  template: `
    <div class="car-container">
      <div class="controll-buttons">
        <app-remove-car-button [id]="car.id"></app-remove-car-button>
        <app-edit-car-button [car]="car"></app-edit-car-button>
        <app-start-driving-button [id]="car.id"> </app-start-driving-button>
        <app-stop-driving-button [id]="car.id"> </app-stop-driving-button>
        <span class="car-name">{{ car.name }}</span>
      </div>

      <div class="road" id="car-road-{{ car.id }}">
        <div class="car" id="car-{{ car.id }}">
          <app-car-image color="{{ car.color }}"></app-car-image>
        </div>
        <div class="flag" id="flag-{{ car.id }}">🏁</div>

        @if (isEngineBroken(car.id)) {
          <div id="engine-broke-{{ car.id }}" class="message">
            Sad ;&lpar; Engine Broke Down
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .car-container {
        margin-bottom: 12px;
        position: relative;
      }
      .controll-buttons {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 5px;
      }
      .road {
        border-bottom: 3px dashed #fff;
        position: relative;
        height: 53px;
      }
      .car {
        position: absolute;
        bottom: -10px;
        left: -10px;
      }
      .flag {
        transform: scaleX(-1);
        position: absolute;
        font-size: 40px;
        bottom: 10px;
        right: 80px;
      }
      .message {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-top: 14px;
        color: #143d59;
        font-weight: 500;
        font-size: 20px;
        text-align: center;
        background: rgb(203 114 114 / 80%);
      }
    `,
  ],
  imports: [
    StartDrivingButtonComponent,
    StopDrivingButtonComponent,
    RemoveCarButtonComponent,
    EditCarButtonComponent,
    CarImageComponent,
  ],
})
export class CarContainerComponent {
  @Input() car!: Car;

  constructor(private carDrivingService: CarDrivingService) {}

  isEngineBroken(id: number): boolean {
    return this.carDrivingService.isEngineBroken(id);
  }
}
