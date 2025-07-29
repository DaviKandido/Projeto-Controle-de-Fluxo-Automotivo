import { Component, Input, OnInit } from '@angular/core';
import { Fluxo } from 'src/app/models/fluxo.model';

@Component({
  selector: 'app-display-fluxo',
  templateUrl: './display-fluxo.component.html',
  styleUrls: ['./display-fluxo.component.scss']
})
export class DisplayFluxoComponent implements OnInit {

  @Input() fluxo: Fluxo;
  
  constructor() { }

  ngOnInit(): void {
  }

}
