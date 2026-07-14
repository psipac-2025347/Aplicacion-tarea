import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private readonly baseUrl = 'http://localhost:3000/api/clientes';

  constructor(private http: HttpClient) {}

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }

  obtener(codigoCliente: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${codigoCliente}`);
  }

  crear(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente);
  }

  actualizar(codigoCliente: string, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/${codigoCliente}`, cliente);
  }

  eliminar(codigoCliente: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${codigoCliente}`);
  }
}