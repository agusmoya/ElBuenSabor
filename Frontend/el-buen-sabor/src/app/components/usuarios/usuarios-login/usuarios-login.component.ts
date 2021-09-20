import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CommonFormComponent } from '../../common-form.component';

@Component({
  selector: 'app-usuarios-login',
  templateUrl: './usuarios-login.component.html',
  styleUrls: ['./usuarios-login.component.css'],
})
export class UsuariosLoginComponent
  extends CommonFormComponent<Usuario, UsuarioService>
  implements OnInit
{
  socialUserGoogle: SocialUser;
  userLoggedInfo$ = this._localStorageService.userLogged$;

  constructor(
    private _localStorageService: LocalStorageService,
    private socialAuthService: SocialAuthService,
    service: UsuarioService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(service, router, route);
    this.titulo = 'Login de Usuario';
    this.model = new Usuario();
    this.redirect = '/home';
    this.nombreModelo = Usuario.name;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  // *** LOGIN WITH GOOGLE ***
  signInWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.socialUserGoogle = user;
        console.log('Usuario Google:', this.socialUserGoogle.email); // user: socialUser
        this.service
          .buscarPorEmail(this.socialUserGoogle.email)
          .subscribe((usuarioEncontrado) => {
            if (usuarioEncontrado !== null) {
              console.log('Usuario encontrado:', usuarioEncontrado);
              this.model = usuarioEncontrado;
              this.login();
            } else {
              this.error = {
                errorUsuario:
                  'Su usuario de Google no es el mismo con el que se registró en nuestro sistema.',
              };
              console.log(this.error.errorUsuario);
            }
          });
      })
      .catch((error) => console.log('Usuario no encontrado', error));
  }
  // *** ---------------- ***
  // *** LOGIN WITH EL BUEN SABOR ***
  login(): void {
    this.model.rol = new Rol(); // inicilizo un rol ficticio para que no me de error
    this.service.validarUsuario(this.model).subscribe(
      (usuario) => {
        this.model.rol = null; // libero el espacio de la variable creada
        if (usuario) {
          this.model = usuario;
          console.log('Usuario logueado: ', this.model);
          // cargo la informacion en el localStorage
          this.setInfoInLocalStorage();
          this.router.navigate([this.redirect]);
        }
      },
      (err) => {
        if (err.status === 400) {
          if (
            err.error &&
            err.error.toString().includes('Usuario no encontrado')
          ) {
            this.error = {
              errorUsuario:
                'El usuario ingresado no está en nuestros registros.',
            };
            console.log('Error de usuario: ', this.error.errorUsuario);
          } else if (
            err.error &&
            err.error.toString().includes('Clave erronea')
          ) {
            this.error = {
              errorClave: 'La clave ingresada es incorrecta',
            };
            console.log('Error de clave: ', this.error.errorClave);
          } else {
            this.error = err.error;
          }
        }
      }
    );
  }
  // *** ---------------- ***

  // *** ADMINISTRACION LOCAL_STORAGE ***
  setInfoInLocalStorage(): void {
    const id = this.model.id;
    const email = this.model.nombre;
    const carroCompraItems = []; //inicializamos carro de compras array

    this._localStorageService.setInfo({
      id,
      email,
      carroCompraItems,
    });
  }
  // *** ---------------- ***
}
