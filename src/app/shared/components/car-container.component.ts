import { Component, Input } from '@angular/core';

import { Car } from '../types';

@Component({
  selector: 'app-car-container',
  standalone: true,
  imports: [],
  template: `
    <div class="car-container" id="car-road-{{ car.id }}">
      <div class="controll-buttons">
        <span class="car-name">{{ car.name }}</span>
      </div>

      <div class="road">
        <div class="flag" id="flag-{{ car.id }}">🏁</div>
      </div>
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
        bottom: 0px;
        right: 80px;
      }
    `,
  ],
})
export class CarContainerComponent {
  @Input() car!: Car;
}

// <div class="car" id="car-${car.id}">${carImage( car.color,)}</div>

// <!-- <button class="start-engine-btn" id="start-engine-car-${car.id}"> -->
// <!-- Start -->
// <!-- </button> -->
// <!-- <button class="stop-engine-btn" id="stop-engine-car-${car.id}" disabled> -->
// <!-- Stop -->
// <!-- </button> -->

// <!-- <button class="select-btn" id="select-car-${car.id}">Select</button> -->
// <!-- <button class="remove-btn" id="remove-car-${car.id}">Remove</button> -->
