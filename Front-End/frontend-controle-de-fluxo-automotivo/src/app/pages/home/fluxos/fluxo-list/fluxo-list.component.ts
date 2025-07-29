import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { Fluxo } from "src/app/models/fluxo.model";
import { FluxoService } from "src/app/services/fluxo.service";

@Component({
  selector: "app-fluxo-list",
  templateUrl: "./fluxo-list.component.html",
  styleUrls: ["./fluxo-list.component.scss"],
})
export class FluxoListComponent implements OnInit {
  fluxos: Fluxo[];
  // = [
  //   {
  //     id: 1,
  //     seq: 1,
  //     data: new Date(),
  //     hora: new Date().getHours(),
  //     placa: "ABC1234",
  //     velMed: 80,
  //     tamVeic: 4,
  //     classVeic: "A",
  //     pesoBt: 1000,
  //     dataRecebimento: new Date(),
  //     equipamentoId: 1,
  //   },
  //   {
  //     id: 2,
  //     seq: 2,
  //     data: new Date(),
  //     hora: new Date().getHours(),
  //     placa: "ZXCSDFG",
  //     velMed: 10,
  //     tamVeic: 4,
  //     classVeic: "A",
  //     pesoBt: 1000,
  //     dataRecebimento: new Date(),
  //     equipamentoId: 1,
  //   },
  // ];
  error: string;

  @ViewChild("formFilter") public formFilter: NgForm;

  constructor(
    private _router: Router,
    private _routerActived: ActivatedRoute,
    private _fluxosService: FluxoService
  ) {
    const resolveData = this._routerActived.snapshot.data["FluxoList"];
    if (resolveData instanceof Array) {
      this.fluxos = resolveData;
    } else {
      this.error = resolveData;
      alert(resolveData);
    }
  }

  codigo: string;
  faixa: number;
  placa: string;
  dataInicio: Date;
  dataFim: Date;
  horaInicio: Time;
  horaFim: Time;
  onFilterChange() {
    this._router.navigate([], {
      relativeTo: this._routerActived,
      queryParams: {
        codigo: this.codigo,
        faixa: this.faixa,
        placa: this.placa,
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        horaInicio: this.horaInicio,
        horaFim: this.horaFim,
      },
      queryParamsHandling: "merge",
    });
  }

  clearFilters() {
    this.formFilter.reset();
    this.onFilterChange();
  }

  ngOnInit(): void {
    this._routerActived.queryParams.subscribe((params) => {
      this.codigo = params["codigo"];
      this.faixa = params["faixa"];
      this.placa = params["placa"];
      this.dataInicio = params["dataInicio"];
      this.dataFim = params["dataFim"];
      this.horaInicio = params["horaInicio"];
      this.horaFim = params["horaFim"];

      this._fluxosService
        .getFluxos({
          codigo: this.codigo,
          faixa: this.faixa,
          placa: this.placa,
          dataInicio: this.dataInicio,
          dataFim: this.dataFim,
          horaInicio: this.horaInicio,
          horaFim: this.horaFim,
        })
        .subscribe(
          (fluxos) => {
            this.fluxos = fluxos;
          },
          (err: any) => {
            this.error = err;
            alert(err);
            console.log(err);
          }
        );
    });
  }
}
