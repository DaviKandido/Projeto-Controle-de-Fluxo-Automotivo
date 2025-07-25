import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipamento } from '../models/equipamento.model';

@Injectable({
  providedIn: "root",
})
export class EquipamentoService {
  constructor(private HttpClient: HttpClient) {}

  private token = localStorage.getItem("token");

  baseUrl = `${environment.apiUrl}/equipamentos`;

  getEquipamentos(): Observable<Equipamento[]> {
    return this.HttpClient.get<Equipamento[]>(`${this.baseUrl}?limit=5`);
  }

  getEquipamento(id: number): Observable<Equipamento> {
    return this.HttpClient.get<Equipamento>(`${this.baseUrl}/${id}`);
  }

  deleteEquipamento(equipamento: Equipamento): Observable<Equipamento> {
    return this.HttpClient.delete<Equipamento>(
      `${this.baseUrl}/${equipamento.id}?limit=5`,
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
    return this.HttpClient.put<Equipamento>(`${this.baseUrl}`, Equipamento, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
}
