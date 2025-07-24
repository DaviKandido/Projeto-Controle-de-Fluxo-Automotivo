import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {

  select = "Login";

  toggleSelect(){
    if(this.select == 'Login'){
      this.select = 'Cadastro'
    }else{
      this.select = 'Login'
    }
  }

  constructor(private _router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this._router.navigate(["/home"]);
    }

  }
}
