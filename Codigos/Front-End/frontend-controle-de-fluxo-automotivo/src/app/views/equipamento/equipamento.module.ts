import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipamentoRoutingModule } from './equipamento-routing.module';
import { VisualizarEquipamentoComponent } from './visualizar-equipamento/visualizar-equipamento.component';


@NgModule({
  declarations: [VisualizarEquipamentoComponent],
  imports: [
    CommonModule,
    EquipamentoRoutingModule
  ]
})
export class EquipamentoModule { }
