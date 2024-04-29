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
    return this.http
      .get<GetWinnerResponse>(`${API_URL}/winners/${id}`, {})
      .pipe();
  }

  createWinner(body: WinnerTemplate): Observable<Car> {
    return this.http
      .post<Car>(`${API_URL}/winners`, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe();
  }

  updateWinner(winnerTemplate: WinnerTemplate): Observable<Car> {
    const body = {
      wins: winnerTemplate.wins,
      time: winnerTemplate.time,
    };

    return this.http
      .put<Car>(`${API_URL}/winners/${winnerTemplate.id}`, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe();
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
    console.log(winnerStatus);
    if (winnerStatus === 404) {
      console.log(' i in block to create new winner');

      this.createWinner({ id, wins: 1, time }).subscribe();
    } else {
      this.getWinner(id).subscribe((winner) => {
        console.log(' i in block to update winner');
        console.log(winner);
        const winnerTemplate: WinnerTemplate = {
          id,
          wins: winner.wins + 1,
          time: time < winner.time ? time : winner.time,
        };
        this.updateWinner(winnerTemplate).subscribe((result) => {
          console.log(result);
        });
      });
    }
  }
}
