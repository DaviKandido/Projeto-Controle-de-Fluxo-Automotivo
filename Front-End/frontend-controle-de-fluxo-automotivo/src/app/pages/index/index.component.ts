import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}
