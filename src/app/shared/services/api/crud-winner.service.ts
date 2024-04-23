import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '../../variables/api';
import { GetWinnerResponse } from './api-types';

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

  deleteWinner(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/winners/${id}`, {}).pipe();
  }
}
