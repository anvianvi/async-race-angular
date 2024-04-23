import { Component, Input } from '@angular/core';

import { Car } from '../types';
import { CarImageComponent } from './car-image.component';
import { StartDrivingButtonComponent } from './start-driving-button.component';

@Component({
  selector: 'app-car-container',
  standalone: true,
  template: `
    <div class="car-container" id="car-road-{{ car.id }}">
      <div class="controll-buttons">
        <app-start-driving-button [id]="car.id"> </app-start-driving-button>

        <span class="car-name">{{ car.name }}</span>
      </div>

      <div class="road">
        <div class="car" id="car-{{ car.id }}">
          <app-car-image color="{{ car.color }}"></app-car-image>
        </div>
        <div class="flag" id="flag-{{ car.id }}">🏁</div>
      </div>
      <div id="engine-broke-{{ car.id }}" class="message"></div>
    </div>
  `,
  styles: [
    `
      ::ng-deep app-not-found {
      }
      .car-container {
        margin: 20px 0 0;
        position: relative;
      }
      .controll-buttons {
        display: flex;
        gap: 10px;
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
        bottom: 24%;
        left: 7%;
        color: red;
        font-weight: 700;
        font-size: 21px;
        width: 430px;
        text-align: center;
        margin-right: -50%;
      }
    `,
  ],
  imports: [CarImageComponent, StartDrivingButtonComponent],
})
export class CarContainerComponent {
  @Input() car!: Car;
}

// <!-- <button class="start-engine-btn" id="start-engine-car-${car.id}"> -->
// <!-- Start -->
// <!-- </button> -->
// <!-- <button class="stop-engine-btn" id="stop-engine-car-${car.id}" disabled> -->
// <!-- Stop -->
// <!-- </button> -->

// <!-- <button class="select-btn" id="select-car-${car.id}">Select</button> -->
// <!-- <button class="remove-btn" id="remove-car-${car.id}">Remove</button> -->
