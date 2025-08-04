import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Equipamento } from '../models/equipamento.model';
import { EquipamentoService } from './equipamento.service';
import { Observable, of } from 'rxjs';
import { catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class EquipamentoListResolverServiceService  implements Resolve<Equipamento[] | string | null> {

  constructor(private _equipamentoService: EquipamentoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Equipamento[] |string > {
      return this._equipamentoService.getEquipamentos().pipe(
        catchError((err: string) => of('Problema ao carregar os equipamentos: ' + err))
      )
  }
}
