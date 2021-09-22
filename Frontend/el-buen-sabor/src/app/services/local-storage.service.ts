import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { LocalStorageRefService } from './local-storage-ref-service.service';

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
    this.filterSameItem(item);
    /GUARDAMOS LOS CAMBIOS EN EL LOCALSTORAGE/;
    this.setInfo(this._userLogged$.getValue());
  }

  filterSameItem(item: any): void {
    const userStorage = this.loadInfo();
    for (const itemCarroStorage of userStorage.carroCompraItems) {
      if (itemCarroStorage.product.id === item.product.id) {
        if (!this.checkStockIf(itemCarroStorage.quantity, item)) return;
        //INCREMENTAMOS CANTIDAD DEL ITEM QUE *YA EXISTE* EN EL CARRO DE COMPRAS
        itemCarroStorage.quantity += item.quantity;
        return;
      }
    }
    //AGREGAMOS EL ITEM *NUEVO* AL CARRO DE COMPRAS
    this._userLogged$.getValue().carroCompraItems.push(item);
  }

  checkStockIf(itemStorageQuantity: number, item: any): boolean {
    if (item.product.esInsumo !== undefined) {
      // console.log('ADD Drink:', item.product.denominacion);
      return this.verifiedStockDrink(itemStorageQuantity, item);
    } else {
      // console.log('ADD ArtManuf:', item.product.denominacion);
      return this.verifiedStockArtManuf(itemStorageQuantity, item);
    }
  }

  verifiedStockDrink(itemStorageQuantity: number, item: any): boolean {
    const totalQuantity = itemStorageQuantity + item.quantity;
    if (totalQuantity <= item.product.stockActual) return true;
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `No hay suficiente stock. Quedan ${
        item.product.stockActual - itemStorageQuantity
      } disponibles.`,
    });
    return false;
  }

  verifiedStockArtManuf(itemStorageQuantity: number, item: any): boolean {
    const totalQuantity = itemStorageQuantity + item.quantity;
    if (totalQuantity <= item.product.stockActual) return true;
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `No hay suficiente stock. Quedan ${
        item.product.stockActual - itemStorageQuantity
      } disponibles.`,
    });
    return false;
  }

  removeItem(index: any): void {
    this._userLogged$.getValue().carroCompraItems.splice(1, index);
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
