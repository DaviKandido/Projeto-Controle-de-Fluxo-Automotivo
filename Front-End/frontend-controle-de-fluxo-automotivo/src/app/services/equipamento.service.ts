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

  getEquipamentos(params?: any): Observable<Equipamento[]> {
    let paramsQuery: HttpParams = new HttpParams();

    paramsQuery = paramsQuery.set("limit", params?.limit || 0);

    if (params?.isAtivo !== "qualquer") {
       paramsQuery = paramsQuery.append(
         "ativo",
         params?.isAtivo == "ativo" ? "true" : "false"
       );
    }

    if(params?.busca !== "") {
      switch (params?.filtro) {
        case "codigo":
           paramsQuery = paramsQuery.append("codigo", params.busca);
          break;
        case "faixa":
           paramsQuery = paramsQuery.append("faixa", params.busca);
          break;
        case "tipo":
           paramsQuery = paramsQuery.append("tipo", params.busca);
          break;
        case "local":
           paramsQuery = paramsQuery.append("local", params.busca);
          break;
        case "marca":
           paramsQuery = paramsQuery.append("marca", params.busca);
          break;
        case "modelo":
           paramsQuery = paramsQuery.append("modelo", params.busca);
          break;
      }
    }
    
    return this.HttpClient.get<Equipamento[]>(this.baseUrl, {
      params: paramsQuery,
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
