import { Equipamento } from "src/app/models/equipamento.model";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FluxoService } from "src/app/services/fluxo.service";
import { EquipamentoService } from "src/app/services/equipamento.service";
import { Time } from "@angular/common";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-analise-de-fluxos",
  templateUrl: "./analise-de-fluxos.component.html",
  styleUrls: ["./analise-de-fluxos.component.scss"],
})
export class AnaliseDeFluxosComponent implements OnInit {
  equipamentos: Equipamento[];
  error: string;

  @ViewChild("formFilter") public formFilter: NgForm;

  constructor(
    private _equipamentoService: EquipamentoService,
    private _fluxoService: FluxoService,
    private _routerActived: ActivatedRoute,
    private _router: Router
  ) {
    // const resolveData = this._routerActived.snapshot.data["equipamentoList"];
    // if (resolveData instanceof Array) {
    //   this.equipamentos = resolveData;
    // } else {
    //   this.error = resolveData;
    //   alert(resolveData);
    // }
  }

  dataInicio: Date;
  dataFim: Date;
  horaInicio: Time;
  horaFim: Time;

  onFilterChange() {
    this._router.navigate([], {
      relativeTo: this._routerActived,
      queryParams: {
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
      this._equipamentoService.getEquipamentos().subscribe((data) => {
        this.equipamentos = data;
        this.equipamentos.forEach((equipamento) => {
          this._fluxoService
            .getCountFluxos(equipamento.id, params)
            .subscribe((data) => {
              equipamento.countFluxos = data;
            });
        });
      });
    });
  }
}
