import { Injectable } from '@angular/core';
import { Fluxo } from '../models/fluxo.model';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FluxoService } from './fluxo.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FluxoListResolverService implements Resolve<Fluxo[] | string | null> {

  constructor(private _fluxoService: FluxoService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Fluxo[] | string> {
    return this._fluxoService.getFluxos().pipe(
      catchError((err: string) => of('Problema ao carregar os fluxos: ' + err))
    )
  }
}
