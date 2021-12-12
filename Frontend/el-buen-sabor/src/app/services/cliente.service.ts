import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Cliente } from '../models/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public enviarEmail(idCliente: number, fileURL: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseEndpoint}/send-mail/${idCliente}`,
      fileURL,
      { headers: this.cabeceras }
    );
  }

  public enviarEmailPDF(file: File, idCliente: number): Observable<void> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<void>(
      `${this.baseEndpoint}/send-mail-pdf/${idCliente}`,
      formData,
      { responseType: 'blob' as 'json' }
    );
  }

  public facturaPDF(idCliente: number, idFactura: number): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'blob',
    });

    return this.http.get<Blob>(
      `${this.baseEndpoint}/${idCliente}/${idFactura}/factura/export/pdf`,
      { headers: headers, responseType: 'blob' as 'json' }
    );
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
    formData.append('telefono', cliente.telefono.toString());
    formData.append('email', cliente.email);
    formData.append('estado', cliente.estado.toString());

    formData.append('usuario', cliente.usuario.id.toString());
    formData.append('usuario.nombre', cliente.usuario.nombre);
    formData.append('usuario.clave', cliente.usuario.clave);
    formData.append('usuario.rol', cliente.usuario.rol.id.toString());
    formData.append('usuario.estado', cliente.usuario.estado.toString());

    formData.append('domicilio', cliente.domicilio.id.toString());
    formData.append('domicilio.calle', cliente.domicilio.calle);
    formData.append('domicilio.numero', cliente.domicilio.numero.toString());

    // formData.append('localidad', cliente.domicilio.localidad.id.toString());
    formData.append(
      'domicilio.localidad.nombre',
      cliente.domicilio.localidad.nombre
    );
    // formData.append(
    //   'departamento',
    //   cliente.domicilio.localidad.departamento.id.toString()
    // );
    formData.append(
      'domicilio.localidad.departamento.nombre',
      cliente.domicilio.localidad.departamento.nombre
    );
    // formData.append(
    //   'provincia',
    //   cliente.domicilio.localidad.departamento.provincia.id.toString()
    // );
    formData.append(
      'domicilio.localidad.departamento.provincia.nombre',
      cliente.domicilio.localidad.departamento.provincia.nombre
    );

    return this.http.put<Cliente>(
      this.baseEndpoint + `/editar-con-foto/${cliente.id}`,
      formData
    );
  }
}
