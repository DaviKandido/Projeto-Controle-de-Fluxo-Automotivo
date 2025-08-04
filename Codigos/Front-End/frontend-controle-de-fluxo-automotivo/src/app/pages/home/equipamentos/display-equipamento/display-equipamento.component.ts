import { Equipamento } from 'src/app/models/equipamento.model';
import { Component, Input, OnInit } from '@angular/core';
import { EquipamentoService } from 'src/app/services/equipamento.service';

@Component({
  selector: "app-display-equipamento",
  templateUrl: "./display-equipamento.component.html",
  styleUrls: ["./display-equipamento.component.scss"],
})
export class DisplayEquipamentoComponent implements OnInit {
  @Input() equipamento: Equipamento;

  constructor(private _equipamentoService: EquipamentoService) {}

  ngOnInit(): void {}
  modal: boolean = false

  abrirModal(){
    this.modal = !this.modal
  }
}
