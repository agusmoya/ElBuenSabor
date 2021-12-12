import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTES PROPIOS
import { HomeComponent } from './components/home/home.component';
import { RolesFormComponent } from './components/roles/roles-form/roles-form.component';
import { RolesComponent } from './components/roles/roles.component';
import { UsuariosFormComponent } from './components/usuarios/usuarios-form/usuarios-form.component';
import { UsuariosLoginComponent } from './components/usuarios/usuarios-login/usuarios-login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RubrosArticuloInsumoFormComponent } from './components/rubros-articulo-insumo/rubros-articulo-insumo-form/rubros-articulo-insumo-form.component';
import { RubrosArticuloInsumoComponent } from './components/rubros-articulo-insumo/rubros-articulo-insumo.component';
import { ArticulosInsumoFormComponent } from './components/articulos-insumo/articulos-insumo-form/articulos-insumo-form.component';
import { ArticulosInsumoComponent } from './components/articulos-insumo/articulos-insumo.component';
import { ArticulosManufacturadosComponent } from './components/articulos-manufacturados/articulos-manufacturados.component';
import { ArticulosManufacturadosFormComponent } from './components/articulos-manufacturados/articulos-manufacturados-form/articulos-manufacturados-form.component';
import { RubrosGeneralesComponent } from './components/rubros-generales/rubros-generales.component';
import { RubrosGeneralesFormComponent } from './components/rubros-generales/rubros-generales-form/rubros-generales-form.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { BebidaDetalleComponent } from './components/bebida-detalle/bebida-detalle.component';
import { CarroCompraComponent } from './components/carro-compra/carro-compra.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PedidoDetalleComponent } from './components/pedidos/pedido-detalle/pedido-detalle.component';

const routes: Routes = [
  // HOME
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  //  PRODUCTO-DETALLE
  { path: 'pedido-detalle/:id', component: PedidoDetalleComponent },
  //  PRODUCTO-DETALLE
  { path: 'producto-detalle/:id', component: ProductoDetalleComponent },
  //  BEBIDA-DETALLE
  { path: 'bebida-detalle/:id', component: BebidaDetalleComponent },
  //  CARRO-COMPRA
  { path: 'carro-compra', component: CarroCompraComponent },
  { path: 'carro-compra/success', component: CarroCompraComponent },
  { path: 'carro-compra/failure', component: CarroCompraComponent },
  { path: 'carro-compra/pending', component: CarroCompraComponent },

  // ABMC usuarios
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuarios/form', component: UsuariosFormComponent },
  { path: 'usuarios/form/:id', component: UsuariosFormComponent },
  { path: 'login', component: UsuariosLoginComponent },

  // ABMC roles
  { path: 'roles', component: RolesComponent },
  { path: 'roles/form', component: RolesFormComponent },
  { path: 'roles/form/:id', component: RolesFormComponent },

  // ABMC rubro-art-ins
  { path: 'rubros-articulo-insumo', component: RubrosArticuloInsumoComponent },
  {
    path: 'rubros-articulo-insumo/form',
    component: RubrosArticuloInsumoFormComponent,
  },
  {
    path: 'rubros-articulo-insumo/form/:id',
    component: RubrosArticuloInsumoFormComponent,
  },

  // ABMC art-ins
  { path: 'articulos-insumo', component: ArticulosInsumoComponent },
  { path: 'articulos-insumo/form', component: ArticulosInsumoFormComponent },
  {
    path: 'articulos-insumo/form/:id',
    component: ArticulosInsumoFormComponent,
  },

  // ABMC rubro-art-manuf
  {
    path: 'rubros-articulos-manufacturados',
    component: RubrosGeneralesComponent,
  },
  {
    path: 'rubro-articulos-manufacturados/form',
    component: RubrosGeneralesFormComponent,
  },
  {
    path: 'rubro-articulos-manufacturados/form/:id',
    component: RubrosGeneralesFormComponent,
  },

  // ABMC art-manuf
  {
    path: 'articulos-manufacturados',
    component: ArticulosManufacturadosComponent,
  },
  {
    path: 'articulos-manufacturados/form',
    component: ArticulosManufacturadosFormComponent,
  },
  {
    path: 'articulos-manufacturados/form/:id',
    component: ArticulosManufacturadosFormComponent,
  },

  // Pedidos para cocinero
  {
    path: 'pedidos',
    component: PedidosComponent,
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
