import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreateEquipamentoComponent } from '../pages/home/create-equipamento/create-equipamento.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateCreateEquipamentoComponentService implements CanDeactivate<CreateEquipamentoComponent> {

  canDeactivate(component: CreateEquipamentoComponent) {
    if (component.equipamentoForm && (component.equipamentoForm.dirty || component.equipamentoForm.touched)) {
      return confirm('Tem certeza que deseja sair sem salvar?');
    }
    return true;
  }


  constructor() { }
}
