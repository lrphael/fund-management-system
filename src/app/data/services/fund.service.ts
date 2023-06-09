import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Fund } from '../models/fund.model';

@Injectable({
  providedIn: 'root'
})
export class FundService {
  private apiUrl = 'http://localhost:3000/api/funds';

  constructor(private http: HttpClient) { }

  getAllFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(this.apiUrl);
  }

  createFund(fund: Fund): Observable<Fund> {
    return this.http.post<Fund>(this.apiUrl, fund);
  }

  updateFund(fund: Fund): Observable<Fund> {
    const url = `${this.apiUrl}/${fund.id}`;
    return this.http.put<Fund>(url, fund);
  }

  deleteFund(fundId: number): Observable<void> {
    const url = `${this.apiUrl}/${fundId}`;
    return this.http.delete<void>(url);
  }

  getFundMaxId(): Observable<number> {
    return this.getAllFunds().pipe(
      map(existingFunds => {
        const maxId = existingFunds.reduce((max, f) => (f.id! > max ? f.id! : max), 0);
        return maxId;
      })
    );
  }

}
