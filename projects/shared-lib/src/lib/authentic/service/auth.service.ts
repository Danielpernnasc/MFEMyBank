import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'projects/shared-lib/src/urlconfig/url.config';
import { catchError, map, Observable, of, tap } from 'rxjs';

const API_URL = Config.urlApi;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${API_URL}/login`, { email, password }).pipe(
      tap(response => {
        if (response?.token) {
          sessionStorage.setItem('authToken', response.token); // Salva o token
        }
      }),
      map(response => !!response?.token),
      catchError(() => of(false))
    );
  }


  logout(): void {
    sessionStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('auth') === 'true';
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }
}





