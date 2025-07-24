import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipamento } from '../models/equipamento.model';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  constructor(private HttpClient: HttpClient) { }

    baseUrl = `${environment.apiUrl}/equipamentos`;

    getEquipamentos(): Observable<Equipamento[]>{
      return this.HttpClient.get<Equipamento[]>(this.baseUrl);
    }
  
}
