import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{
    path: '',
    data: {
      title: 'Equipamento',
      permissions: {},
    },
    children: [
      {
        path: 'cadastrar',
        component: VisualizarEquipamentoComponent,
        data: {
          title: 'Pesquisar Lote de Fluxo',
          permissions: {
            only: 'lotefluxo:pesquisar',
          },
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipamentoRoutingModule { }
