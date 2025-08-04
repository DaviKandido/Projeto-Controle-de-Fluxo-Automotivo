import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Integrador } from '../models/integrador.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class IntegradorService {

  private token = localStorage.getItem("token");

  baseUrl = `${environment.apiUrl}/integradores`;

  constructor(private httpClient: HttpClient) {}

  getIntegradores(): Observable<Integrador[]> {
    return this.httpClient.get<Integrador[]>(this.baseUrl);
  }

  getIntegrador(id: number): Observable<Integrador> {
    return this.httpClient.get<Integrador>(this.baseUrl + "/" + id);
  }
}
