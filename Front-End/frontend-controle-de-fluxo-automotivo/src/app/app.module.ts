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
import { EquipamentoListComponent } from "./pages/home/equipamento-list/equipamento-list.component";
import { DisplayEquipamentoComponent } from "./pages/home/display-equipamento/display-equipamento.component";
import { DetailsEquipamentoComponent } from "./pages/home/details-equipamento/details-equipamento.component";
import { CreateEquipamentoComponent } from "./pages/home/create-equipamento/create-equipamento.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { EquipamentoService } from "./services/equipamento.service";
import { EquipamentoListResolverServiceService } from "./services/equipamento-list-resolver-service.service";
import { MunicipioService } from "./services/municipio.service";

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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
