import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${API_URL}/clientes/login`, { email, password }).pipe(
      tap(response => {
        if (response?.token) {
          localStorage.setItem('authToken', response.token); // Salva o token
        }
      }),
      map(response => !!response?.token),
      catchError(() => of(false))
    );
  }
  

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('auth') === 'true';
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}





