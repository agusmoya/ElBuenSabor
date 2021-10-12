import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Cliente } from '../models/cliente';
import { HttpClient } from '@angular/common/http';
import { BASE_ENDPOINT } from '../config/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService extends CommonService<Cliente> {
  protected baseEndpoint = BASE_ENDPOINT + '/clientes';

  constructor(http: HttpClient) {
    super(http);
  }

  public buscarPorEmail(email: String): Observable<Cliente> {
    return this.http.get<Cliente>(
      `${this.baseEndpoint}/buscar-por-email/${email}`
    );
  }
}
