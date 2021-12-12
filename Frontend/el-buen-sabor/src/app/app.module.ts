import { LOCALE_ID, NgModule } from '@angular/core';
// Cambio Idioma a español
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

// COMPONENTES PROPIOS
import { LayoutModule } from './layout/layout.module';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RolesComponent } from './components/roles/roles.component';
import { RolesFormComponent } from './components/roles/roles-form/roles-form.component';
import { RubrosArticuloInsumoComponent } from './components/rubros-articulo-insumo/rubros-articulo-insumo.component';
import { RubrosArticuloInsumoFormComponent } from './components/rubros-articulo-insumo/rubros-articulo-insumo-form/rubros-articulo-insumo-form.component';
import { ArticulosInsumoComponent } from './components/articulos-insumo/articulos-insumo.component';
import { ArticulosInsumoFormComponent } from './components/articulos-insumo/articulos-insumo-form/articulos-insumo-form.component';
import { ArticulosManufacturadosComponent } from './components/articulos-manufacturados/articulos-manufacturados.component';
import { UsuariosFormComponent } from './components/usuarios/usuarios-form/usuarios-form.component';
import { UsuariosLoginComponent } from './components/usuarios/usuarios-login/usuarios-login.component';

///
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from 'angularx-social-login';
// import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ArticulosManufacturadosFormComponent } from './components/articulos-manufacturados/articulos-manufacturados-form/articulos-manufacturados-form.component';
import { RubrosGeneralesComponent } from './components/rubros-generales/rubros-generales.component';
import { RubrosGeneralesFormComponent } from './components/rubros-generales/rubros-generales-form/rubros-generales-form.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { BebidaDetalleComponent } from './components/bebida-detalle/bebida-detalle.component';
import { CarroCompraComponent } from './components/carro-compra/carro-compra.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PedidoDetalleComponent } from './components/pedidos/pedido-detalle/pedido-detalle.component';

const CLIENT_ID = environment.client_id;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsuariosComponent,
    UsuariosFormComponent,
    UsuariosLoginComponent,
    RolesComponent,
    RolesFormComponent,
    ArticulosInsumoComponent,
    ArticulosManufacturadosComponent,
    RubrosArticuloInsumoComponent,
    RubrosArticuloInsumoFormComponent,
    ArticulosInsumoFormComponent,
    ArticulosManufacturadosFormComponent,
    RubrosGeneralesComponent,
    RubrosGeneralesFormComponent,
    ProductoDetalleComponent,
    BebidaDetalleComponent,
    CarroCompraComponent,
    PedidosComponent,
    PedidoDetalleComponent,
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    SocialLoginModule,
  ],
  providers: [
    // CookieService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(CLIENT_ID),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
