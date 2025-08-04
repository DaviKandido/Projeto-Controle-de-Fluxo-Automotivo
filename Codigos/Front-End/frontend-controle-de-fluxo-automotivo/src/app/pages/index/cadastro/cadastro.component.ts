import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Route, Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class CadastroComponent implements OnInit {
  @ViewChild("CadastroForm") public CadastroForm: NgForm;
  @Input() select: string;
  @Output() selectChange = new EventEmitter<string>();

  constructor(private _router: Router, private _userService: UserService) {}

  cadastroData: User = {
    login: null,
    senha: null,
    confirmSenha: null,
    ativo: true,
  };

  CadastroInit() {
    try {
      if (this.cadastroData.senha != this.cadastroData.confirmSenha) {
        throw new Error("Senhas não conferem");
      }

      this._userService.cadastro(this.cadastroData).subscribe(
        (res) => {
          alert(`Cadastro realizado com sucesso!, Agora faca login!`);
          this.CadastroForm.reset();
          this.select = "Login";
          this.selectChange.emit(this.select);
        },
        (err) => {
          alert(`Erro ao cadastrar: ${err.error.message}`);
        }
      );
    } catch (err) {
      alert(`Erro ao logar: ${err.message}`);
    }
  }

  ngOnInit(): void {}
}
