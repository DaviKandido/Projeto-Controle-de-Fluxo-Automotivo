import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Equipamento } from "src/app/models/equipamento.model";

@Component({
  selector: "app-equipamento-list",
  templateUrl: "./equipamento-list.component.html",
  styleUrls: ["./equipamento-list.component.scss"],
})
export class EquipamentoListComponent implements OnInit {
  error: string;

  equipamentos: Equipamento[]
  //  = [
  //   {
  //     id: 1,
  //     codigo: "EQP001",
  //     faixa: 1,
  //     tipo: "CEV",
  //     ativo: true,
  //     local: "Rodovia BR-040, km 120",
  //     marca: "XYZ Sensores",
  //     modelo: "S1000",
  //     velocidadeLimite: 80,
  //     dataAfericao: new Date(Date.parse("2025-01-15")),
  //     lacre: "L123456",
  //     dataRegistroInmetro: new Date(Date.parse("2025-01-10")), //"2025-01-10",
  //     numeroInmetro: "INM123456789",
  //     integradorId: 1,
  //     municipioId: 1,
  //     Integrador: {
  //       id: 1,
  //       nome: "CONSILUX",
  //     },
  //     Municipio: {
  //       id: 3825,
  //       codigo: 3825,
  //       descricao: "RIACHAO DAS NEVES",
  //       uf: "BA",
  //     },
  //     Fluxos: [
  //       {
  //         id: 1827893,
  //         seq: 77,
  //         data: "2025-03-29",
  //         hora: "03:27:02",
  //         placa: "",
  //         velMed: 32,
  //         tamVeic: 467,
  //         classVeic: "B",
  //         pesoBt: null,
  //         dataRecebimento: "2025-04-05T21:14:41.000Z",
  //         equipamentoId: 16,
  //       },
  //       {
  //         id: 1827894,
  //         seq: 79,
  //         data: "2025-03-29",
  //         hora: "03:27:54",
  //         placa: "",
  //         velMed: 24,
  //         tamVeic: 1206,
  //         classVeic: "C",
  //         pesoBt: null,
  //         dataRecebimento: "2025-04-05T21:14:41.000Z",
  //         equipamentoId: 16,
  //       },
  //     ],
  //   },
  // ];

  constructor(
    private _router: Router,
    private _routeActivated: ActivatedRoute
  ) {
    const resolveData: Equipamento[] | string =
      this._routeActivated.snapshot.data["equipamentoList"];
    if (resolveData instanceof Array) {
      this.equipamentos = resolveData;
    } else {
      this.error = resolveData;
      alert(resolveData);
    }
  }

  ngOnInit(): void {}
}
