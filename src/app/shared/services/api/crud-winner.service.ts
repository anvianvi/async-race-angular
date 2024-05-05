import { HttpClient } from '@angular/common/http';
import { computed, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Car, GetWinnerResponse } from './api-types';
import { DataSourseService } from './data-sourse.service';
import { WinnerTemplate } from './get-winners.service';

@Injectable({
  providedIn: 'root',
})
export class CrudWinnerService {
  API_URL = computed(() => {
    return this.dataSourseService.API_URL();
  });

  constructor(
    private http: HttpClient,
    private dataSourseService: DataSourseService,
  ) {}

  getWinner(id: number): Observable<GetWinnerResponse> {
    return this.http.get<GetWinnerResponse>(
      `${this.API_URL()}/winners/${id}`,
      {},
    );
  }

  createWinner(body: WinnerTemplate): Observable<Car> {
    return this.http.post<Car>(`${this.API_URL()}/winners`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  updateWinner(winnerTemplate: WinnerTemplate): Observable<Car> {
    const body = {
      wins: winnerTemplate.wins,
      time: winnerTemplate.time,
    };

    return this.http.put<Car>(
      `${this.API_URL()}/winners/${winnerTemplate.id}`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  deleteWinner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL()}/winners/${id}`, {}).pipe();
  }

  getWinnerStatus = async (id: number): Promise<number> => {
    const response = await fetch(`${this.API_URL()}/winners/${id}`);
    return response.status;
  };

  async saveWinnerResult(id: number, time: number) {
    const winnerStatus = await this.getWinnerStatus(id);
    if (winnerStatus === 404) {
      this.createWinner({ id, wins: 1, time }).subscribe();
    } else {
      this.getWinner(id).subscribe((winner) => {
        const winnerTemplate: WinnerTemplate = {
          id,
          wins: winner.wins + 1,
          time: time < winner.time ? time : winner.time,
        };
        this.updateWinner(winnerTemplate).subscribe();
      });
    }
  }
}
