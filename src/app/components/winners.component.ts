import { Component, computed, OnInit } from '@angular/core';

import { CrudCarService } from '../shared/services/api/crud-car.service';
// import { RouterOutlet } from '@angular/router';
import { GetWinnersService } from '../shared/services/api/get-winners.service';

@Component({
  selector: 'app-winners-page',
  standalone: true,
  // imports: [RouterOutlet],
  template: `<div class="winners-heading">
      <div>Winners: {{ winnersCount() }}</div>
      <div>Page № {{ winnersCurrentPage() }}</div>
    </div>
    <button (click)="paginationLeft()" [disabled]="winnersCurrentPage() < 2">
      PREV
    </button>
    <button (click)="paginationRight()" [disabled]="isLastPage()">NEXT</button>
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
            <td>{{ winner.id }}</td>
            <td>{{ winner.id }} car color</td>
            <td>{{ winner.id }}</td>
            <td>{{ winner.wins }}</td>
            <td>{{ winner.time }}</td>
          </tr>
        }
      </tbody>
    </table>`,
  styles: `
    .winners-view {
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
  sortOrder = computed(() => {
    return this.getWinnersService.sortOrder();
  });
  sortField = computed(() => {
    return this.getWinnersService.sortField();
  });
  // type SortField = 'id' | 'wins' | 'time';
  // type SortOrder = 'ASC' | 'DESC';
  constructor(
    private getWinnersService: GetWinnersService,
    private getCarService: CrudCarService,
  ) {}

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
    console.log(this.sortField());
    console.log(this.sortOrder());
    if (field === this.sortField()) {
      if (this.sortOrder() === 'ASC') {
        this.getWinnersService.sortOrder.set('DESC');
      } else {
        this.getWinnersService.sortOrder.set('ASC');
      }
    } else {
      this.getWinnersService.sortField.set(field);
      // if (this.sortOrder() === 'ASC') {
      //   this.getWinnersService.sortOrder.set('DESC');
      // } else {
      //   this.getWinnersService.sortOrder.set('ASC');
      // }
      this.getWinnersService.sortOrder.set('ASC');
    }
    this.getWinnersService.getWinners();
  }
}
