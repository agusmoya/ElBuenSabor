import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Generic } from '../models/generic';

@Injectable({
  providedIn: 'root',
})
export abstract class CommonService<E extends Generic> {
  protected baseEndpoint: string;
  protected cabeceras: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(protected http: HttpClient) {}

  public listar(): Observable<E[]> {
    return this.http.get<E[]>(this.baseEndpoint);
  }

  public listarPaginado(page: string, size: string): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.baseEndpoint}/paged`, { params: params });
  }

  public listarPaginadoPorFecha(
    page: string,
    size: string,
    diaActualPedidos: Date
  ): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('diaActualPedidos', diaActualPedidos.toDateString());
    return this.http.get<any>(`${this.baseEndpoint}/paged`, { params: params });
  }

  public ver(id: number): Observable<E> {
    return this.http.get<E>(`${this.baseEndpoint}/${id}`);
  }

  public crear(entity: E): Observable<E> {
    return this.http.post<E>(this.baseEndpoint, entity, {
      headers: this.cabeceras,
    });
  }

  public editar(entity: E): Observable<E> {
    return this.http.put<E>(`${this.baseEndpoint}/${entity.id}`, entity, {
      headers: this.cabeceras,
    });
  }

  public eliminar(entity: E): Observable<E> {
    return this.http.put<E>(
      `${this.baseEndpoint}/eliminar/${entity.id}`,
      entity,
      {
        headers: this.cabeceras,
      }
    );
  }
}
