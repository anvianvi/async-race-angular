import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '../../variables/api';
import { Car, GetWinnerResponse } from './api-types';
import { WinnerTemplate } from './get-winners.service';

@Injectable({
  providedIn: 'root',
})
export class CrudWinnerService {
  constructor(private http: HttpClient) {}

  getWinner(id: number): Observable<GetWinnerResponse> {
    return this.http.get<GetWinnerResponse>(`${API_URL}/winners/${id}`, {});
  }

  createWinner(body: WinnerTemplate): Observable<Car> {
    return this.http.post<Car>(`${API_URL}/winners`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  updateWinner(winnerTemplate: WinnerTemplate): Observable<Car> {
    const body = {
      wins: winnerTemplate.wins,
      time: winnerTemplate.time,
    };

    return this.http.put<Car>(`${API_URL}/winners/${winnerTemplate.id}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deleteWinner(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/winners/${id}`, {}).pipe();
  }

  static getWinnerStatus = async (id: number): Promise<number> => {
    const response = await fetch(`${API_URL}/winners/${id}`);
    return response.status;
  };

  async saveWinnerResult(id: number, time: number) {
    const winnerStatus = await CrudWinnerService.getWinnerStatus(id);
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
