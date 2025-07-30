import { Equipamento } from 'src/app/models/equipamento.model';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IndexComponent } from "./pages/index/index.component";
import { LoginComponent } from "./pages/index/login/login.component";
import { CadastroComponent } from "./pages/index/cadastro/cadastro.component";
import { HomeComponent } from "./pages/home/home.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UserService } from "./services/user.service";
import { NavbarComponent } from "./pages/home/navbar/navbar.component";
import { EquipamentoListComponent } from "./pages/home/equipamentos/equipamento-list/equipamento-list.component";
import { DisplayEquipamentoComponent } from "./pages/home/equipamentos/display-equipamento/display-equipamento.component";
import { DetailsEquipamentoComponent } from "./pages/home/equipamentos/details-equipamento/details-equipamento.component";
import { CreateEquipamentoComponent } from "./pages/home/equipamentos/create-equipamento/create-equipamento.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { EquipamentoService } from "./services/equipamento.service";
import { EquipamentoListResolverServiceService } from "./services/equipamento-list-resolver-service.service";
import { MunicipioService } from "./services/municipio.service";
import { FluxoListComponent } from './pages/home/fluxos/fluxo-list/fluxo-list.component';
import { FluxoService } from './services/fluxo.service';
import { FluxoListResolverService } from './services/fluxo-list-resolver.service';
import { IntegradorService } from './services/integrador.service';
import { DisplayFluxoComponent } from './pages/home/fluxos/display-fluxo/display-fluxo.component';
import { AnaliseDeFluxosComponent } from './pages/home/fluxos/analise-de-fluxos/analise-de-fluxos.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    NavbarComponent,
    EquipamentoListComponent,
    DisplayEquipamentoComponent,
    DetailsEquipamentoComponent,
    CreateEquipamentoComponent,
    FluxoListComponent,
    DisplayFluxoComponent,
    AnaliseDeFluxosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule
    ],
  providers: [
    UserService,
    EquipamentoService,
    EquipamentoListResolverServiceService,
    MunicipioService,
    FluxoService,
    FluxoListResolverService,
    IntegradorService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
