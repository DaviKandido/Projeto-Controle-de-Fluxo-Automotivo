import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { exit } from "process";

import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private _router: Router, private _userService: UserService) {}
  ngOnInit(): void {}

  loginData: User = {
    login: null,
    senha: null,
    confirmSenha: null,
  };

  loginInit(): void {
    try {
      if (this.loginData.senha != this.loginData.confirmSenha) {
        throw new Error("Senhas não conferem");
      }
      this._userService.login(this.loginData).subscribe(
        (res: any) => {
          if (res.token) {
            localStorage.setItem("token", res.token);
            this._router.navigate(["/home"]);
          }
        },
        (err) => {
          alert(`Erro ao logar: ${err.message}`);
        }
      );
    } catch (err) {
      alert(`Erro ao logar: ${err.message}`);
    }
  }
}
