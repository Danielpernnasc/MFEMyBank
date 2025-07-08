import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { Config } from '../../urlconfig/url.config';
import { AuthService } from '../authentic/service/auth.service';

const API_URL = Config.urlApi;

@Injectable({ providedIn: 'root' })
export class ClienteService {
  constructor(
    private http: HttpClient,
    private authService: AuthService // Certifique-se de importar AuthService corretamente
  ) { }

  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${API_URL}`, cliente);
  }

  buscarPorEmail(email: string): Observable<Cliente> {

    const token = localStorage.getItem('authToken'); // Provide an empty string as the password
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    console.log('headers', headers);
    return this.http.get<Cliente>(`${API_URL}/email/${email}`, { headers });
  }
}
