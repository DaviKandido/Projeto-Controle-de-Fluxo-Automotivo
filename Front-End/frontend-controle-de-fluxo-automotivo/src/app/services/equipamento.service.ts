import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Equipamento } from "../models/equipamento.model";

@Injectable({
  providedIn: "root",
})
export class EquipamentoService {
  constructor(private HttpClient: HttpClient) {}

  private token = localStorage.getItem("token");

  baseUrl = `${environment.apiUrl}/equipamentos`;

  getEquipamentos(query?: any): Observable<Equipamento[]> {
    let params: HttpParams = new HttpParams();

    params = params.set("limit", query?.limit || 0);

    if (query?.codigo) params = params.append("codigo", query.codigo);
    if (query?.faixa) params = params.append("codigo", query.faixa);
    if (query?.placa) params = params.append("placa", query.placa);
    if (query?.integrador) params = params.append("integrador", query.integrador.id);
    if (query?.ativo) params = params.append("ativo", query.ativo);
    
      return this.HttpClient.get<Equipamento[]>(this.baseUrl, {
        params: params,
      });
  }

  getEquipamento(id: number, limite?: number): Observable<Equipamento> {
    return this.HttpClient.get<Equipamento>(
      `${this.baseUrl}/${id}?limit=${limite || 0}`
    );
  }

  deleteEquipamento(equipamento: Equipamento): Observable<Equipamento> {
    return this.HttpClient.delete<Equipamento>(
      `${this.baseUrl}/${equipamento.id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  saveEquipamento(Equipamento: Equipamento): Observable<Equipamento> {
    return this.HttpClient.post<Equipamento>(`${this.baseUrl}`, Equipamento, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
  updateEquipamento(Equipamento: Equipamento): Observable<Equipamento> {
    return this.HttpClient.put<Equipamento>(
      `${this.baseUrl}/${Equipamento.id}`,
      Equipamento,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }
}
