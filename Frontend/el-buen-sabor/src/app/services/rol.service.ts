import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { Rol } from '../models/rol';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class RolService extends CommonService<Rol> {
  protected baseEndpoint = BASE_ENDPOINT + '/roles';

  constructor(http: HttpClient) {
    super(http);
  }

  public verFoto(rol: Rol): Observable<any> {
    return this.http.get<any>(`${this.baseEndpoint}/cargar/img/${rol.id}`);
  }

  public crearConFoto(rol: Rol, archivo: File): Observable<Rol> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('denominacion', rol.denominacion);
    // Como vemos, no es necesario pasar las cabeceras, ya que con el formData
    // en el body, por defecto se setea el MultipartFormData como tipo de contenido
    return this.http.post<Rol>(this.baseEndpoint + '/crear-con-foto', formData);
  }

  public editarConFoto(rol: Rol, archivo: File): Observable<Rol> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('denominacion', rol.denominacion);
    formData.append('estado', rol.estado.toString());

    return this.http.put<Rol>(
      `${this.baseEndpoint}/editar-con-foto/${rol.id}`,
      formData
    );
  }
}

// QUITAMOS TODO, YA QUE IMPLEMENTAMOS PROGRAMACION GENÉRICA:
/*
private cabeceras: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
});

constructor(private http: HttpClient) {}

public listar(): Observable<Rol[]> {
  return this.http.get<Rol[]>(this.baseEndpoint);
}

public listarPaginado(page: string, size: string): Observable<any> {
  const params = new HttpParams().set('page', page).set('size', size);
  return this.http.get<any>(`${this.baseEndpoint}/paged`, { params: params });
}

public ver(id: number): Observable<Rol> {
  return this.http.get<Rol>(`${this.baseEndpoint}/${id}`);
}

public crear(rol: Rol): Observable<Rol> {
  return this.http.post<Rol>(this.baseEndpoint, rol, {
    headers: this.cabeceras,
  });
}

public editar(rol: Rol): Observable<Rol> {
  return this.http.put<Rol>(`${this.baseEndpoint}/${rol.id}`, rol, {
    headers: this.cabeceras,
  });
}

public eliminar(rol: Rol): Observable<Rol> {
  return this.http.put<Rol>(`${this.baseEndpoint}/${rol.id}`, rol, {
    headers: this.cabeceras,
  });
}*/
