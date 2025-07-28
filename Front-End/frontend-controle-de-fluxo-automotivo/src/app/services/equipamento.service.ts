import { HttpClient, HttpHeaders } from "@angular/common/http";
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
    let limit = params?.limit || 0;
    let string = "";

    if (params?.isAtivo != "qualquer") {
      string = `ativo=${params?.isAtivo == "ativo" ? "true" : "false"}`;
    }
    if (params?.busca !== "") {
      switch (params?.filtro) {
        case "codigo":
          string = `&codigo=${params?.busca}`;
          break;
        case "faixa":
          string = `&faixa=${params?.busca}`;
          break;
        case "tipo":
          string = `&tipo=${params?.busca}`;
          break;
        case "local":
          string = `&local=${params?.busca}`;
          break;
        case "marca":
          string = `&marca=${params?.busca}`;
          break;
        case "modelo":
          string = `&modelo=${params?.busca}`;
          break;
      }
    }

    return this.HttpClient.get<Equipamento[]>(
      `${this.baseUrl}?limit=${limit || 0}&${string}`
    );
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
