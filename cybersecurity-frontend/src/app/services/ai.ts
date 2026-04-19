import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AiPrediction {
  severity: string;
  status: string;
  predictedRisk: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private apiUrl = 'http://localhost:8080/api/ai/predict';

  constructor(private http: HttpClient) {}

  getPrediction(severity: string, status: string): Observable<AiPrediction> {
    return this.http.get<AiPrediction>(
      `${this.apiUrl}?severity=${severity}&status=${status}`
    );
  }
}