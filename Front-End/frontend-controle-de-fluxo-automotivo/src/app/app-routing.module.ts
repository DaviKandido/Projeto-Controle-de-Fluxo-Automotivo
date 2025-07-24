import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from "./pages/index/index.component";
import { HomeComponent } from "./pages/home/home.component";
import { EquipamentoListResolverServiceService } from "./services/equipamento-list-resolver-service.service";
import { EquipamentoListComponent } from "./pages/home/equipamento-list/equipamento-list.component";

const routes: Routes = [
  {
    path: "index",
    component: IndexComponent,
  },
  {
    path: "home",
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "equipamentos",
        component: EquipamentoListComponent,
        // resolve: {
        //   equipamentoList: EquipamentoListResolverServiceService,
        // },
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
