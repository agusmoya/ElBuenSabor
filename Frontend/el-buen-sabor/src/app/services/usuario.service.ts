import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { Usuario } from '../models/usuario';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends CommonService<Usuario> {
  protected baseEndpoint = BASE_ENDPOINT + '/usuarios';

  constructor(http: HttpClient) {
    super(http);
  }

  public verFoto(usuario: Usuario): Observable<any> {
    return this.http.get<any>(`${this.baseEndpoint}/cargar/img/${usuario.id}`);
  }

  public crearConFoto(usuario: Usuario, archivo: File): Observable<Usuario> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', usuario.nombre);
    formData.append('clave', usuario.clave);
    formData.append('rol', usuario.rol.id.toString());

    return this.http.post<Usuario>(
      this.baseEndpoint + '/crear-con-foto',
      formData
    );
  }

  public editarConFoto(usuario: Usuario, archivo: File): Observable<Usuario> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', usuario.nombre);
    formData.append('clave', usuario.clave);
    formData.append('rol', usuario.rol.id.toString());
    formData.append('estado', usuario.estado.toString());

    return this.http.put<Usuario>(
      `${this.baseEndpoint}/editar-con-foto/${usuario.id}`,
      formData
    );
  }

  public buscarPorEmail(email: String): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseEndpoint}/buscar-por-email/${email}`);
  }

  public validarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(
      `${this.baseEndpoint}/verificar-login`,
      usuario,
      {
        headers: this.cabeceras,
      }
    );
  }

  // TODO los dejo aquí porque se supone que deberían solicitar
  // TODO los tokens en el back. AVERIGUAR AL FINAL!!
  // public setMailUserLoggedCookie(emailUser: string): void {
  //   // setToken
  //   this.cookies.set('emailUserLogged', emailUser);
  // }

  // public getMailUserLoggedCookie(): string {
  //   // getToken
  //   return this.cookies.get('emailUserLogged');
  // }

  //
  // public getUserLoggedLocalStorage(): Usuario {
  //   return JSON.parse(localStorage.getItem('usuarioLogueado'));
  // }

  // public setUserLoggedLocalStorage(usuario_logueado: Usuario): void {
  //   localStorage.setItem('usuarioLogueado', JSON.stringify(usuario_logueado));
  // }
  // TODO ****************************************************** //
}
