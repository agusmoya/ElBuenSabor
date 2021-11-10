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

  public buscarPorEmail(email: String): Observable<any> {
    return this.http.get<any>(`${this.baseEndpoint}/buscar-por-email/${email}`);
  }

  public crearConFoto(cliente: Cliente, archivo: File): Observable<Cliente> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', cliente.nombre);
    formData.append('apellido', cliente.apellido);
    formData.append('email', cliente.usuario.nombre);
    formData.append('telefono', cliente.telefono.toString());
    formData.append('usuario.nombre', cliente.usuario.nombre);
    formData.append('usuario.clave', cliente.usuario.clave);
    formData.append('usuario.rol', cliente.usuario.rol.id.toString());
    formData.append('domicilio.numero', cliente.domicilio.numero.toString());
    formData.append('domicilio.calle', cliente.domicilio.calle.toString());
    formData.append(
      'domicilio.localidad.nombre',
      cliente.domicilio.localidad.nombre
    );
    formData.append(
      'domicilio.localidad.departamento.nombre',
      cliente.domicilio.localidad.departamento.nombre
    );
    formData.append(
      'domicilio.localidad.departamento.provincia.nombre',
      cliente.domicilio.localidad.departamento.provincia.nombre
    );
    formData.append(
      'usuario.imagenHashCode',
      cliente.usuario.imagenHashCode.toString()
    );

    return this.http.post<Cliente>(
      this.baseEndpoint + '/crear-con-foto',
      formData
    );
  }

  public editarConFoto(cliente: Cliente, archivo: File): Observable<Cliente> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', cliente.nombre);
    formData.append('apellido', cliente.apellido);
    formData.append('email', cliente.email);
    formData.append('telefono', cliente.telefono.toString());
    formData.append('usuario', cliente.usuario.id.toString());
    formData.append('domicilio', cliente.domicilio.id.toString());

    return this.http.put<Cliente>(
      this.baseEndpoint + `/editar-con-foto/${cliente.id}`,
      formData
    );
  }
}
