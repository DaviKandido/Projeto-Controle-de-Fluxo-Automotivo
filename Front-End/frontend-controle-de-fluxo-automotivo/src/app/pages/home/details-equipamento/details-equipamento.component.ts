import { Component, Input, OnInit } from '@angular/core';
import { Equipamento } from 'src/app/models/equipamento.model';

@Component({
  selector: "app-details-equipamento",
  templateUrl: "./details-equipamento.component.html",
  styleUrls: ["./details-equipamento.component.scss"],
})
export class DetailsEquipamentoComponent implements OnInit {

  @Input() equipamento: Equipamento;

  constructor() {}

  ngOnInit(): void {
    console.log(this.equipamento.Municipio);
  }
}
