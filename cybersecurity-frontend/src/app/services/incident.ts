import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Incident {
  id?: number;
  title: string;
  description: string;
  severity: string;
  status: string;
  assignedTo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private apiUrl = 'http://localhost:8080/api/incidents';

  constructor(private http: HttpClient) {}

  getAllIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.apiUrl);
  }

  createIncident(incident: Incident): Observable<Incident> {
    return this.http.post<Incident>(this.apiUrl, incident);
  }
  updateIncident(id: number, incident: Incident): Observable<Incident> {
  return this.http.put<Incident>(`${this.apiUrl}/${id}`, incident);
}

deleteIncident(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
assignIncident(id: number, data: any) {
  return this.http.put(`http://localhost:8080/api/incidents/${id}/assign`, data);
}
}