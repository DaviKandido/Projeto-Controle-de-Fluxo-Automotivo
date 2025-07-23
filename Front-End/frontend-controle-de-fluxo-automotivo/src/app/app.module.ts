import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IndexComponent } from "./pages/index/index.component";
import { LoginComponent } from './pages/index/login/login.component';
import { CadastroComponent } from './pages/index/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import { UserService } from "./services/user.service";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
