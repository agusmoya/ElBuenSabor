import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

    if (!this.filterSameItem(product)) {
      this._userLogged$.getValue().carroCompraItems.push(product);
    }
    this.setInfo(this._userLogged$.getValue());
  }

  filterSameItem({ item, cantidad }): boolean {
    const userStorage = this.loadInfo();
    for (const itemCarroStorage of userStorage.carroCompraItems) {
      if (itemCarroStorage.item.id === item.id) {
        console.log('CANTIDAD Item Storage:', itemCarroStorage.cantidad);
        console.log('CANTIDAD Product Storage:', cantidad);
        itemCarroStorage.cantidad += cantidad;
        console.log('CANTIDAD Item Storage:', itemCarroStorage.cantidad);

        this.setInfo(this._userLogged$.getValue());
        return true;
      }
    }
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
