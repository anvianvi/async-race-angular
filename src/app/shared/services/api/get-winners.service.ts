import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { API_URL } from '../../variables/api';
import { CrudCarService } from './crud-car.service';

export type Winner = {
  id: number;
  wins: number;
  time: number;
  car: {
    color: string;
    name: string;
  };
};
export type WinnerTemplate = {
  id: number;
  wins: number;
  time: number;
};
export interface WinnersResponse {
  kind?: string;
  etag?: string;
  id: number;
  wins: number;
  time: number;
}

type SortField = 'id' | 'wins' | 'time';
type SortOrder = 'ASC' | 'DESC';

@Injectable({
  providedIn: 'root',
})
export class GetWinnersService {
  winnersInGarage = signal<WinnerTemplate[] | []>([]);
  totalAmountofWinners = signal<number>(0);
  winnersCurrentPage = signal<number>(1);
  sortOrder = signal<SortOrder>('ASC');
  sortField = signal<SortField>('id');

  elementsPerPageAccordingToRequirements = 5;
  elementsPerPage = this.elementsPerPageAccordingToRequirements;

  constructor(
    private getCarService: CrudCarService,
    private http: HttpClient,
  ) {}
  getWinners = async () => {
    const sortOrder = `_sort=${this.sortField()}&_order=${this.sortOrder()}`;
    const response = await fetch(
      `${API_URL}/winners?_page=${this.winnersCurrentPage()}&_limit=${this.elementsPerPage}&${sortOrder}`,
    );

    const count = Number(response.headers.get('X-Total-Count'));
    const items = (await response.json()) as WinnerTemplate[];
    console.log(response);
    console.log(items);

    this.winnersInGarage.set(items);
    this.totalAmountofWinners.set(count);
  };
}
