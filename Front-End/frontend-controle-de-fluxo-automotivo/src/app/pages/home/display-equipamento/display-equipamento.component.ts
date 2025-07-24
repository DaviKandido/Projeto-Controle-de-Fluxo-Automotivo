import { Component, Input, OnInit } from '@angular/core';
import { Equipamento } from 'src/app/models/equipamento.model';

@Component({
  selector: 'app-display-equipamento',
  templateUrl: './display-equipamento.component.html',
  styleUrls: ['./display-equipamento.component.scss']
})
export class DisplayEquipamentoComponent implements OnInit {

  @Input() equipamento: Equipamento;


  constructor() { }

  ngOnInit(): void {
  }

}
