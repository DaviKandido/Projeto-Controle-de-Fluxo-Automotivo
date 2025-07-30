import { Equipamento } from 'src/app/models/equipamento.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Fluxo } from '../models/fluxo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class FluxoService {
  constructor(private HttpClient: HttpClient) {}

  private token = localStorage.getItem("token");

  baseUrl = `${environment.apiUrl}/fluxos`;

  getFluxos(query?: any): Observable<Fluxo[]> {
    let params = new HttpParams();
    params = params.set("limit", `${query?.limit || 10}`);

    if (query?.codigo) {
      params = params.append("CodEquipamento", `${query.codigo}`);
    }
    if (query?.faixa) {
      params = params.append("faixaEquipamento", `${query.faixa}`);
    }
    if (query?.placa) {
      params = params.append("placa", `${query.placa}`);
    }
    if (query?.dataInicio) {
      params = params.append("dataInicio", `${query.dataInicio}`);
    }
    if (query?.dataFim) {
      params = params.append("dataFim", `${query.dataFim}`);
    }
    if (query?.horaInicio) {
      params = params.append("horaInicio", `${query.horaInicio}`);
    }
    if (query?.horaFim) {
      params = params.append("horaFim", `${query.horaFim}`);
    }

    return this.HttpClient.get<Fluxo[]>(this.baseUrl, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
      params: params,
    });
  }

  getCountFluxos(EquipamentoId: number, query?: any): Observable<number> {
    let params = new HttpParams();


    if (query?.dataInicio) {
      params = params.append("dataInicio", `${query.dataInicio}`);
    }
    if (query?.dataFim) {
      params = params.append("dataFim", `${query.dataFim}`);
    }
    if (query?.horaInicio) {
      params = params.append("horaInicio", `${query.horaInicio}`);
    }
    if (query?.horaFim) {
      params = params.append("horaFim", `${query.horaFim}`);
    }

    return this.HttpClient.get<number>(
      `${this.baseUrl}/count/${EquipamentoId}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
        params: params,
      }
    );
  }
}
