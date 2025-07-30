import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  logout() {
    if (confirm("Deseja realmente sair?")) {
      this._router.navigate(["/index"]).then(() => {
        localStorage.clear();
        window.location.reload();
      });
    }
  }

  theme: string = "dark";
  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    document.body.classList.toggle(this.theme);
  }
}
