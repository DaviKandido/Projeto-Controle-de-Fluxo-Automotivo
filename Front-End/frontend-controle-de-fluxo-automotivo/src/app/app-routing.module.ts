import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from "./pages/index/index.component";
import { HomeComponent } from "./pages/home/home.component";
import { EquipamentoListResolverServiceService } from "./services/equipamento-list-resolver-service.service";
import { EquipamentoListComponent } from "./pages/home/equipamentos/equipamento-list/equipamento-list.component";
import { DetailsEquipamentoComponent } from "./pages/home/equipamentos/details-equipamento/details-equipamento.component";
import { CreateEquipamentoComponent } from "./pages/home/equipamentos/create-equipamento/create-equipamento.component";
import { CanDeactivateCreateEquipamentoComponentService } from "./services/can-deactivate-create-equipamento-component.service";
import { FluxoListComponent } from "./pages/home/fluxos/fluxo-list/fluxo-list.component";
import { FluxoListResolverService } from "./services/fluxo-list-resolver.service";

const routes: Routes = [
  {
    path: "index",
    component: IndexComponent,
  },
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "equipamentos",
        component: EquipamentoListComponent,
        resolve: {
          equipamentoList: EquipamentoListResolverServiceService,
        },
      },
      {
        path: "equipamentos/:id",
        component: DetailsEquipamentoComponent,
      },
      {
        path: "edit/equipamentos/:id",
        component: CreateEquipamentoComponent,
        canDeactivate: [CanDeactivateCreateEquipamentoComponentService],
      },
      {
        path: "fluxos",
        component: FluxoListComponent,
        resolve: {
          FluxoList: FluxoListResolverService
        }
      },
    ],
  },
  {
    path: "",
    redirectTo: "/index",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
