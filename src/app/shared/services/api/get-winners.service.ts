import { Injectable, signal } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

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

type SortField = 'id' | 'wins' | 'time';
type SortOrder = 'ASC' | 'DESC';

@Injectable({
  providedIn: 'root',
})
export class GetWinnersService {
  winnersInGarage = signal<Winner[] | []>([]);
  totalAmountofWinners = signal<number>(0);
  winnersCurrentPage = signal<number>(1);
  sortOrder = signal<SortOrder>('ASC');
  sortField = signal<SortField>('id');

  elementsPerPageAccordingToRequirements = 5;
  elementsPerPage = this.elementsPerPageAccordingToRequirements;

  constructor(private getCarService: CrudCarService) {}

  getWinners = async () => {
    const sortOrder = `_sort=${this.sortField()}&_order=${this.sortOrder()}`;
    const response = await fetch(
      `${API_URL}/winners?_page=${this.winnersCurrentPage()}&_limit=${this.elementsPerPage}&${sortOrder}`,
    );

    const count = Number(response.headers.get('X-Total-Count'));
    const items = (await response.json()) as WinnerTemplate[];
    console.log(response);
    console.log(items);

    // const letstest = ;D
    this.enrichWinnersWithCarDetails(items).subscribe((result) => {
      this.winnersInGarage.set(result);
    });

    // this.winnersInGarage.set(items);
    this.totalAmountofWinners.set(count);
  };

  enrichWinnersWithCarDetails(item: WinnerTemplate[]): Observable<Winner[]> {
    const carRequests = item.map((winner) => {
      return this.getCarService.getCar(winner.id).pipe(
        map((carData) => ({
          id: winner.id,
          wins: winner.wins,
          time: winner.time,
          car: {
            color: carData.color,
            name: carData.name,
          },
        })),
      );
    });

    return forkJoin(carRequests).pipe();
  }
}
