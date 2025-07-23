import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  logout() {
    if(confirm("Deseja realmente sair?")) {
      this._router.navigate(["/index"]).then(() => {
        localStorage.clear();
        window.location.reload();
      })
    }
  }
}
