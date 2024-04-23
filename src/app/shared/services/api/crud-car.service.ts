import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '../../variables/api';

@Injectable({
  providedIn: 'root',
})
export class CrudCarService {
  constructor(private http: HttpClient) {}

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/garage/${id}`, {}).pipe();
  }
}
