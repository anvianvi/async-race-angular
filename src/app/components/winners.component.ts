import { Component, computed, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CarImageComponent } from '../shared/components/car-image.component';
import { GetWinnersService } from '../shared/services/api/get-winners.service';

@Component({
  imports: [CarImageComponent, MatIconModule, MatButtonModule],
  selector: 'app-winners-page',
  standalone: true,
  template: ` <div class="winners-view">
    <div class="winners-heading">
      <div class="pagination-container">
        <button
          mat-icon-button
          (click)="paginationLeft()"
          [disabled]="winnersCurrentPage() < 2"
        >
          <mat-icon>chevron_left</mat-icon>
        </button>
        <div>Page {{ winnersCurrentPage() }} / {{ totalPages() }}</div>

        <button
          mat-icon-button
          (click)="paginationRight()"
          [disabled]="isLastPage()"
        >
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>
    </div>
    <table cellspacing="3" border="0" cellpadding="3">
      <thead>
        <th>№</th>
        <th>Car</th>
        <th>Name</th>
        <th (click)="sortWinners('wins')">
          Wins
          {{
            sortField() === 'wins' ? (sortOrder() === 'ASC' ? '▲' : '▼') : ''
          }}
        </th>
        <th (click)="sortWinners('time')">
          Time
          {{
            sortField() === 'time' ? (sortOrder() === 'ASC' ? '▲' : '▼') : ''
          }}
        </th>
      </thead>
      <tbody>
        @for (winner of listOfwinners(); track winner.id) {
          <tr>
            <td class="col1">{{ winner.id }}</td>
            <td class="col2">
              <app-car-image color="{{ winner.car.color }}"></app-car-image>
            </td>
            <td class="col3">{{ winner.car.name }}</td>
            <td class="col4">{{ winner.wins }}</td>
            <td class="col5">{{ winner.time }}</td>
          </tr>
        }
      </tbody>
    </table>
  </div>`,
  styles: `
    .winners-view {
      width: 80vw;
      margin-inline: auto;

      th {
        text-align: left;
      }
      .col1 {
        min-width: 35px;
      }
      .col3 {
        min-width: 50px;
        max-width: 19vw;

        word-wrap: break-word;
      }
      @media screen and (width> 700px) {
        .col3 {
          max-width: 39vw;
        }
      }
      .col4,
      .col5 {
        min-width: 40px;
      }
    }
    .pagination-container {
      display: flex;
      align-items: center;
      gap: 10px;
      width: fit-content;
    }
  `,
})
export class WinnersComponent implements OnInit {
  listOfwinners = computed(() => {
    return this.getWinnersService.winnersInGarage();
  });
  winnersCount = computed(() => {
    return this.getWinnersService.totalAmountofWinners();
  });
  winnersCurrentPage = computed(() => {
    return this.getWinnersService.winnersCurrentPage();
  });
  isLastPage = computed(() => {
    return (
      this.winnersCount() / this.getWinnersService.elementsPerPage <=
      this.getWinnersService.winnersCurrentPage()
    );
  });
  totalPages = computed(() => {
    return Math.ceil(
      this.winnersCount() / this.getWinnersService.elementsPerPage,
    );
  });
  sortOrder = computed(() => {
    return this.getWinnersService.sortOrder();
  });
  sortField = computed(() => {
    return this.getWinnersService.sortField();
  });

  constructor(private getWinnersService: GetWinnersService) {}

  ngOnInit(): void {
    this.getWinnersService.getWinners();
  }

  paginationLeft() {
    this.getWinnersService.winnersCurrentPage.update((value) => value - 1);
    this.getWinnersService.getWinners();
  }
  paginationRight() {
    this.getWinnersService.winnersCurrentPage.update((value) => value + 1);
    this.getWinnersService.getWinners();
  }

  sortWinners(field: 'id' | 'wins' | 'time') {
    if (field === this.sortField()) {
      if (this.sortOrder() === 'ASC') {
        this.getWinnersService.sortOrder.set('DESC');
      } else {
        this.getWinnersService.sortOrder.set('ASC');
      }
    } else {
      this.getWinnersService.sortField.set(field);
      this.getWinnersService.sortOrder.set('ASC');
    }
    this.getWinnersService.getWinners();
  }
}
