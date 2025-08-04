import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipamento } from 'src/app/models/equipamento.model';
import { EquipamentoService } from 'src/app/services/equipamento.service';

@Component({
  selector: "app-details-equipamento",
  templateUrl: "./details-equipamento.component.html",
  styleUrls: ["./details-equipamento.component.scss"],
})
export class DetailsEquipamentoComponent implements OnInit {

  private _id: number;
  equipamento: Equipamento;

  constructor(private _router: Router, private _routeActivated: ActivatedRoute, private _equipamentoService:  EquipamentoService) {}

  ngOnInit(): void {
    this._routeActivated.params.subscribe((params) => {
      this._equipamentoService.getEquipamento(+params["id"]).subscribe((equipamento) => {
        this.equipamento = equipamento,
        (error: any) => console.log(error)
      })
    })
  }
}
