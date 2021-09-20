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

  addItem(product: any): void {
    console.log('ADD ITEM:', product);
    this.filterSameItem(product);
    /GUARDAMOS LOS CAMBIOS EN EL LOCALSTORAGE/;
    this.setInfo(this._userLogged$.getValue());
  }

  filterSameItem({ item, cantidad }): void {
    const userStorage = this.loadInfo();
    for (const itemCarroStorage of userStorage.carroCompraItems) {
      if (itemCarroStorage.item.id === item.id) {
        if (!this.checkStock(itemCarroStorage.cantidad, { item, cantidad })) {
          return;
        }
        itemCarroStorage.cantidad += cantidad;
        return;
      }
    }
    this._userLogged$.getValue().carroCompraItems.push({ item, cantidad });
  }

  checkStock(itemStorageQuantity: number, { item, cantidad }): boolean {
    const totalQuantity = itemStorageQuantity + cantidad;
    if (totalQuantity <= item.stockActual) {
      return true;
    }
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `No hay suficiente stock. Quedan ${
        item.stockActual - itemStorageQuantity
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

// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import Swal from 'sweetalert2';
// import { LocalStorageRefService } from './local-storage-ref-service.service';

// interface UserLogged {
//   id: number;
//   email: string;
//   carroCompraItems: any[];
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class LocalStorageService {
//   private _localStorage: Storage;
//   private _userLogged$ = new BehaviorSubject<UserLogged>(null);
//   public userLogged$ = this._userLogged$.asObservable();

//   constructor(_localStorageRefService: LocalStorageRefService) {
//     this._localStorage = _localStorageRefService.localStorage;
//   }

//   addItem(product: any): void {
//     console.log('ADD ITEM:', product);

//     /si el carro está vacío agregamos el producto directamente/
//     if (this._userLogged$.getValue().carroCompraItems.length == 0) {
//       this.setInfo(this._userLogged$.getValue());
//     } else if (!this.filterSameItem(product)) {
//       // this._userLogged$.getValue().carroCompraItems.push(product);
//       this.userLogged$.subscribe((userLogged) => {
//         userLogged.carroCompraItems.push(product);
//       });
//     }
//     this.setInfo(this._userLogged$.getValue());
//   }

//   filterSameItem({ item, cantidad }): boolean {
//     const userStorage = this.loadInfo();
//     for (const itemCartStorage of userStorage.carroCompraItems) {
//       if (itemCartStorage.item.id === item.id) {
//         console.log('CANTIDAD Item Storage:', itemCartStorage.cantidad);
//         console.log('CANTIDAD Product Storage:', cantidad);
//         itemCartStorage.cantidad += cantidad;
//         console.log('CANTIDAD Item Storage:', itemCartStorage.cantidad);
//         this.setInfo(this._userLogged$.getValue());
//         return true;
//       }
//     }
//     return false;
//   }

//   checkStock(itemStorageQuantity: number, { item, cantidad }): boolean {
//     const totalQuantity = itemStorageQuantity + cantidad;
//     if (totalQuantity <= item.stockActual) {
//       return true;
//     }
//     Swal.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: `No hay suficiente stock. ${
//         item.stockActual - itemStorageQuantity
//       } unidades disponibles.`,
//     });
//     return false;
//   }

//   removeItem(index: any): void {
//     this._userLogged$.getValue().carroCompraItems.splice(1, index);
//   }

//   setInfo(data: UserLogged) {
//     const jsonData = JSON.stringify(data);
//     this._localStorage.setItem('userLogged', jsonData);
//     this._userLogged$.next(data);
//   }

//   loadInfo(): UserLogged {
//     const data = JSON.parse(this._localStorage.getItem('userLogged'));
//     this._userLogged$.next(data);
//     return data;
//   }

//   clearInfo() {
//     this._localStorage.removeItem('userLogged');
//     this._userLogged$.next(null);
//   }

//   clearAllLocalStorage() {
//     this._localStorage.clear();
//     this._userLogged$.next(null);
//   }
// }
