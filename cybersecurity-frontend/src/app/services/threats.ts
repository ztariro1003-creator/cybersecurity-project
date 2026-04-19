import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Threat {
  threat_id?: number;
  name: string;
  description: string;
  severity_level: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThreatsService {
  private apiUrl = 'http://localhost:8080/api/threats';

  constructor(private http: HttpClient) {}

  getAllThreats(): Observable<Threat[]> {
    return this.http.get<Threat[]>(this.apiUrl);
  }

  getThreatById(id: number): Observable<Threat> {
    return this.http.get<Threat>(`${this.apiUrl}/${id}`);
  }

  createThreat(threat: Threat): Observable<Threat> {
    return this.http.post<Threat>(this.apiUrl, threat);
  }

  updateThreat(id: number, threat: Threat): Observable<Threat> {
    return this.http.put<Threat>(`${this.apiUrl}/${id}`, threat);
  }

  deleteThreat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}