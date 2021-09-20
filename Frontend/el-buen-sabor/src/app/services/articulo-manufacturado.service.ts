import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { ArticuloManufacturado } from '../models/articulo-manufacturado';
import { ArticuloManufacturadoDetalle } from '../models/articulo-manufacturado-detalle';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ArticuloManufacturadoService extends CommonService<ArticuloManufacturado> {
  protected baseEndpoint = BASE_ENDPOINT + '/articulos-manufacturados';

  constructor(http: HttpClient) {
    super(http);
  }

  public verFoto(artManuf: ArticuloManufacturado): Observable<any> {
    return this.http.get<any>(`${this.baseEndpoint}/cargar/img/${artManuf.id}`);
  }

  public crearConFoto(
    artManuf: ArticuloManufacturado,
    archivo: File
  ): Observable<ArticuloManufacturado> {
    const formData = new FormData();
    formData.append('denominacion', artManuf.denominacion);
    formData.append(
      'tiempoEstimadoCocina',
      artManuf.tiempoEstimadoCocina.toString()
    );
    formData.append('precioVenta', artManuf.precioVenta.toString());
    formData.append('archivo', archivo);
    formData.append('rubroGeneral', artManuf.rubroGeneral.id.toString());
    this.guardarDetallesEnFormData(
      formData,
      artManuf.detallesArticuloManufacturado
    );

    return this.http.post<ArticuloManufacturado>(
      this.baseEndpoint + '/crear-con-foto',
      formData
    );
  }

  public editarConFoto(
    artManuf: ArticuloManufacturado,
    archivo: File
  ): Observable<ArticuloManufacturado> {
    const formData = new FormData();
    formData.append('denominacion', artManuf.denominacion);
    formData.append(
      'tiempoEstimadoCocina',
      artManuf.tiempoEstimadoCocina.toString()
    );
    formData.append('precioVenta', artManuf.precioVenta.toString());
    formData.append('archivo', archivo);
    formData.append('rubroGeneral', artManuf.rubroGeneral.id.toString());
    formData.append('estado', artManuf.estado.toString());

    this.guardarDetallesEnFormData(
      formData,
      artManuf.detallesArticuloManufacturado
    );

    return this.http.put<ArticuloManufacturado>(
      `${this.baseEndpoint}/editar-con-foto/${artManuf.id}`,
      formData
    );
  }

  public guardarDetallesEnFormData(
    formData: FormData,
    detalles: ArticuloManufacturadoDetalle[]
  ): void {
    for (let index = 0; index < detalles.length; index++) {
      formData.append(
        'detallesArticuloManufacturado[' + index + '].cantidad',
        detalles[index].cantidad.toString()
      );
      formData.append(
        'detallesArticuloManufacturado[' + index + '].unidadMedida',
        detalles[index].unidadMedida
      );
      formData.append(
        'detallesArticuloManufacturado[' + index + '].articuloInsumo',
        detalles[index].articuloInsumo.id.toString()
      );
    }
  }
}
