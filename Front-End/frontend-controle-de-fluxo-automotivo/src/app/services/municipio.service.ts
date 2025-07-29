import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipio } from '../models/municipio.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(private HttpClient: HttpClient) { }

  getMunicipios(): Observable<Municipio[]> {

    let params = new HttpParams();
    params = params.append('limit', '10');

    return this.HttpClient.get<Municipio[]>(`${environment.apiUrl}/municipios`, {
      params: params
    });
  }

}
