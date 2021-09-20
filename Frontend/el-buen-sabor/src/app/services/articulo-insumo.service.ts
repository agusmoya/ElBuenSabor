import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { ArticuloInsumo } from '../models/articulo-insumo';
import { RubroArticuloInsumo } from '../models/rubro-articulo-insumo';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ArticuloInsumoService extends CommonService<ArticuloInsumo> {
  protected baseEndpoint = BASE_ENDPOINT + '/articulos-insumo/';

  constructor(http: HttpClient) {
    super(http);
  }

  public getAllArticulosInsumo(): Observable<ArticuloInsumo[]> {
    return this.http.get<ArticuloInsumo[]>(`${this.baseEndpoint}`);
  }

  public findAllRubrosArticulosInsumo(): Observable<RubroArticuloInsumo[]> {
    return this.http.get<RubroArticuloInsumo[]>(`${this.baseEndpoint}/rubros`);
  }

  public verFoto(artInsumo: ArticuloInsumo): Observable<any> {
    return this.http.get<any>(
      `${this.baseEndpoint}/cargar/img/${artInsumo.id}`
    );
  }

  public crearConFoto(
    artInsumo: ArticuloInsumo,
    archivo: File
  ): Observable<ArticuloInsumo> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    this.guardarDatosEnFormData(formData, artInsumo);

    return this.http.post<ArticuloInsumo>(
      this.baseEndpoint + '/crear-con-foto',
      formData
    );
  }

  public editarConFoto(
    artInsumo: ArticuloInsumo,
    archivo: File
  ): Observable<ArticuloInsumo> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    this.guardarDatosEnFormData(formData, artInsumo);

    return this.http.put<ArticuloInsumo>(
      `${this.baseEndpoint}/editar-con-foto/${artInsumo.id}`,
      formData
    );
  }

  private guardarDatosEnFormData(
    formData: FormData,
    artInsumo: ArticuloInsumo
  ): void {
    formData.append('denominacion', artInsumo.denominacion);
    formData.append('precioCompra', artInsumo.precioCompra.toString());
    formData.append('precioVenta', artInsumo.precioVenta.toString());
    formData.append('stockActual', artInsumo.stockActual.toString());
    formData.append('stockMinimo', artInsumo.stockMinimo.toString());
    formData.append('unidadMedida', artInsumo.unidadMedida);
    formData.append('esInsumo', artInsumo.esInsumo.toString());
    formData.append('rubroPadre', artInsumo.rubroPadre.id.toString());
    formData.append('rubroHijo', artInsumo.rubroHijo.id.toString());
    formData.append('estado', artInsumo.estado.toString());
  }
}
