import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageRefService } from './local-storage-ref-service.service';
import { ArticuloInsumo } from '../models/articulo-insumo';
import { ArticuloManufacturado } from '../models/articulo-manufacturado';

interface UserLogged {
  id: number;
  email: string;
  carroCompraItems: any[];
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _localStorage: Storage;
  private _userLogged$ = new BehaviorSubject<UserLogged>(null);
  public userLogged$ = this._userLogged$.asObservable();

  constructor(_localStorageRefService: LocalStorageRefService) {
    this._localStorage = _localStorageRefService.localStorage;
  }

  addItem(item: any): void {
    if (this.filterSameItem(item)) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 900,
      });
    }
    /*GUARDAMOS LOS CAMBIOS EN EL LOCALSTORAGE*/
    this.setInfo(this._userLogged$.getValue());
  }

  // filterSameItem(item: any): boolean {
  //   const userStorage = this.loadInfo();
  //   for (const itemCartStorage of userStorage.carroCompraItems) {
  //     if (
  //       typeof item === itemCartStorage &&
  //       itemCartStorage.product.id === item.product.id
  //     ) {
  //       //SIN STOCK. MUESTRO ALERTA Y NO SE REALIZA NINGUNA ACCION
  //       if (!this.checkStock(itemCartStorage.quantity, item)) return false;
  //       //INCREMENTAMOS CANTIDAD DEL ITEM QUE *YA EXISTE* EN EL CARRO DE COMPRAS
  //       itemCartStorage.quantity += item.quantity;
  //       return true;
  //     }
  //   }
  //   //AGREGAMOS EL ITEM *NUEVO* AL CARRO DE COMPRAS
  //   this._userLogged$.getValue().carroCompraItems.push(item);
  //   return true;
  // }

  filterSameItem(item: any): boolean {
    const userStorage = this.loadInfo();
    for (const itemCartStorage of userStorage.carroCompraItems) {
      if (
        item.product.esInsumo == itemCartStorage.product.esInsumo &&
        itemCartStorage.product.id === item.product.id
      ) {
        //SIN STOCK. MUESTRO ALERTA Y NO SE REALIZA NINGUNA ACCION
        if (!this.checkStock(itemCartStorage.quantity, item)) return false;
        //INCREMENTAMOS CANTIDAD DEL ITEM QUE *YA EXISTE* EN EL CARRO DE COMPRAS
        itemCartStorage.quantity += item.quantity;
        return true;
      }
    }
    //AGREGAMOS EL ITEM *NUEVO* AL CARRO DE COMPRAS
    this._userLogged$.getValue().carroCompraItems.push(item);
    return true;
  }

  checkStock(storedQuantity: number, item: any): boolean {
    if (item.product.esInsumo !== undefined) {
      // console.log('ADD Drink:', item.product.denominacion);
      return this.verifiedStockDrink(storedQuantity, item);
    } else {
      // console.log('ADD ArtManuf:', item.product.denominacion);
      return this.verifiedStockArtManuf(storedQuantity, item);
    }
  }

  verifiedStockDrink(storedQuantity: number, item: any): boolean {
    const totalQuantity = storedQuantity + item.quantity;
    if (totalQuantity <= item.product.stockActual) return true;
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '¡No hay stock disponible en estos momentos!',
    });
    return false;
  }

  verifiedStockArtManuf(storedQuantity: number, item: any): boolean {
    const totalQuantity = Number(storedQuantity) + Number(item.quantity);
    let verified = true;

    item.product.detallesArticuloManufacturado.forEach((detalle) => {
      if (
        totalQuantity * detalle.cantidad >
        detalle.articuloInsumo.stockActual
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡No hay suficiente stock para la cantidad solicitada!',
        });
        verified = false;
      }
    });
    return verified;
  }

  // removeItem(itemSeleccionado: any): void {
  //   this._userLogged$.getValue().carroCompraItems = this._userLogged$
  //     .getValue()
  //     .carroCompraItems.filter((item) => item.product.id !== itemSeleccionado.id);
  //   this.setInfo(this._userLogged$.getValue());
  // }

  removeItem(itemSeleccionado: any, indice: any): void {
    // console.log(itemSeleccionado.product.esInsumo == false);

    // this._userLogged$.getValue().carroCompraItems = this._userLogged$
    //   .getValue()
    //   .carroCompraItems.filter(
    //     (item) =>
    //     itemSeleccionado.product.esInsumo == item.product.esInsumo &&
    //       item.product.id == itemSeleccionado.id
    //   );

    this._userLogged$.getValue().carroCompraItems = this._userLogged$
      .getValue()
      .carroCompraItems.filter(
        (item, index) =>
          indice != index && item.product.id != itemSeleccionado.id
      );

    this.setInfo(this._userLogged$.getValue());
  }

  cleanShoppinCart(): void {
    this._userLogged$.getValue().carroCompraItems = [];
    this.setInfo(this._userLogged$.getValue());
  }

  setInfo(data: UserLogged) {
    const jsonData = JSON.stringify(data);
    this._localStorage.setItem('userLogged', jsonData);
    this._userLogged$.next(data);
  }

  loadInfo(): UserLogged {
    const data = JSON.parse(this._localStorage.getItem('userLogged'));
    this._userLogged$.next(data);
    return data;
  }

  clearInfo() {
    this._localStorage.removeItem('userLogged');
    this._userLogged$.next(null);
  }

  clearAllLocalStorage() {
    this._localStorage.clear();
    this._userLogged$.next(null);
  }
}
