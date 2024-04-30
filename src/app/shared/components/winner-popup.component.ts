import { Component, computed } from '@angular/core';

import { GetCarsService } from '../services/api/get-cars.service';
import { RaceProcessService } from '../services/race-process.service';

@Component({
  selector: 'app-winner-popup',
  standalone: true,
  template: `
    @if (displayCurrentWinner()) {
      <div
        tabindex="0"
        class="winner-popup-wrapper"
        (click)="closePopup()"
        (keydown)="handleKeyDown($event)"
      >
        <div class="winner-popup">
          <h1>Congratulations to the Winner!</h1>

          <p>
            Car: {{ cars()[currentWinnerId()].name }} with time:
            {{ currentWinnerTime() }}
            seconds!
          </p>
          <button (click)="closePopup()">Close</button>
        </div>
      </div>
    }
  `,
  styles: `
    .winner-popup-wrapper {
      background-color: rgba(0, 0, 0, 0.7);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .winner-popup {
      min-width: 300px;
      max-width: calc(min(80vh, 800px));
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      p {
        margin-bottom: 0.5em;
      }

      h3 {
        text-align: center;
        font-size: 2em;
        margin-bottom: 1em;
      }

      button {
        padding: 10px 20px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }

      .winner-popup button:hover {
        background-color: #3e8e41;
      }
    }
  `,
})
export class WinnerPopupComponent {
  cars = computed(() => {
    return this.getCarsService.carsInGarage();
  });

  displayCurrentWinner = computed(() => {
    return this.raceService.displayCurrentWinner();
  });

  currentWinnerId = computed(() => {
    return this.raceService.currentWinnersId();
  });
  currentWinnerTime = computed(() => {
    return this.raceService.currentWinnersTime();
  });

  constructor(
    private raceService: RaceProcessService,
    private getCarsService: GetCarsService,
  ) {}
  closePopup() {
    this.raceService.resetRace();

    console.log('Mersedes went first in 2.89 seconds!');
    // console.log(this.currentWinner());
  }
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      // Close popup on Escape key
      this.closePopup();
    }
  }
}
