import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('role', response.role);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isAnalyst(): boolean {
    return this.getRole() === 'ANALYST';
  }

  isViewer(): boolean {
    return this.getRole() === 'VIEWER';
  }

  canManageData(): boolean {
    return this.isAdmin() || this.isAnalyst();
  }
  canViewIncidents(): boolean {
  return true; // everyone can view
}

canAssignIncidents(): boolean {
  return this.isAdmin() || this.isAnalyst();
}
}