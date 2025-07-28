import { Integrador } from "./../../../models/integrador.model";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Equipamento } from "src/app/models/equipamento.model";
import { Municipio } from "src/app/models/municipio.model";
import { EquipamentoService } from "src/app/services/equipamento.service";
import { IntegradorService } from "src/app/services/integrador.service";
import { MunicipioService } from "src/app/services/municipio.service";

@Component({
  selector: "app-create-equipamento",
  templateUrl: "./create-equipamento.component.html",
  styleUrls: ["./create-equipamento.component.scss"],
})
export class CreateEquipamentoComponent implements OnInit {
  @ViewChild("equipamentoForm") public equipamentoForm: NgForm;

  equipamento: Equipamento = {
    id: null,
    codigo: null,
    faixa: null,
    tipo: null,
    ativo: false,
    local: null,
    marca: null,
    modelo: null,
    velocidadeLimite: null, 
    dataAfericao: null,
    lacre: null,
    dataRegistroInmetro: null,
    numeroInmetro: null,
    integradorId: null,
    municipioId: null,
  };

  UFS = [
    { sigla: "AC", nome: "Acre" },
    { sigla: "AL", nome: "Alagoas" },
    { sigla: "AP", nome: "Amapá" },
    { sigla: "AM", nome: "Amazonas" },
    { sigla: "BA", nome: "Bahia" },
    { sigla: "CE", nome: "Ceará" },
    { sigla: "DF", nome: "Distrito Federal" },
    { sigla: "ES", nome: "Espírito Santo" },
    { sigla: "GO", nome: "Goiás" },
    { sigla: "MA", nome: "Maranhão" },
    { sigla: "MT", nome: "Mato Grosso" },
    { sigla: "MS", nome: "Mato Grosso do Sul" },
    { sigla: "MG", nome: "Minas Gerais" },
    { sigla: "PA", nome: "Pará" },
    { sigla: "PB", nome: "Paraíba" },
    { sigla: "PR", nome: "Paraná" },
    { sigla: "PE", nome: "Pernambuco" },
    { sigla: "PI", nome: "Piauí" },
    { sigla: "RJ", nome: "Rio de Janeiro" },
    { sigla: "RN", nome: "Rio Grande do Norte" },
    { sigla: "RS", nome: "Rio Grande do Sul" },
    { sigla: "RO", nome: "Rondônia" },
    { sigla: "RR", nome: "Roraima" },
    { sigla: "SC", nome: "Santa Catarina" },
    { sigla: "SP", nome: "São Paulo" },
    { sigla: "SE", nome: "Sergipe" },
    { sigla: "TO", nome: "Tocantins" },
  ];

  municipios: Municipio[] = [];
  municipiosExibidos: Municipio[] = [];
  integradores: Integrador[] = [];

  private _estadoSelecionado: string;
  set estadoSelecionado(value: string) {
    if (value === this._estadoSelecionado) return;
    if (!value) {
      this.municipiosExibidos = this.municipios;
      return;
    }

    this._estadoSelecionado = value;
    this.municipiosExibidos = this.municipios.filter(
      (municipio) => municipio.uf === value
    );
  }
  get estadoSelecionado() {
    return this._estadoSelecionado;
  }

  constructor(
    private _municipioService: MunicipioService,
    private _IntegradorService: IntegradorService,
    private _equipamentoService: EquipamentoService,
    private _RouteActivated: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._municipioService.getMunicipios().subscribe(
      (municipios) => {
        this.municipios = municipios;
        this.municipiosExibidos = municipios;
      },
      (error: any) => console.log(error)
    );
    this._IntegradorService.getIntegradores().subscribe(
      (integradores) => {
        this.integradores = integradores;
      },
      (error: any) => console.log(error)
    );

    this._RouteActivated.paramMap.subscribe((paramMap) => {
      const id = +paramMap.get("id");
      this.getEquipamento(id);
    });
  }

  getEquipamento(id: number) {
    if (id === 0) {
      this.equipamento = {
        id: null,
        codigo: null,
        faixa: null,
        tipo: null,
        ativo: false,
        local: null,
        marca: null,
        modelo: null,
        velocidadeLimite: null,
        dataAfericao: null,
        lacre: null,
        dataRegistroInmetro: null,
        numeroInmetro: null,
        integradorId: null,
        municipioId: null,
      };
    } else {
      this._equipamentoService.getEquipamento(id).subscribe(
        (equipamento) => {
          this.equipamento = equipamento;
          this.equipamento.ativo = this.equipamento.ativo ? true : false;
          this.estadoSelecionado = this.equipamento.Municipio.uf;
        },
        (error: any) => {
           alert(`Erro ao buscar Equipamento: ${error.error.message}`);
          console.log(error)}
      );
    }
  }

  saveEquipamento() {
    console.log(this.equipamento);
    if (this.equipamento.id === null) {
      this._equipamentoService.saveEquipamento(this.equipamento).subscribe(
        (equipamento) => {
          console.log(equipamento);
          this.equipamentoForm.reset();
          alert("Equipamento salvo com sucesso!");
          this._router.navigate(["/home/equipamentos"]);
        },
        (error: any) => {
          alert(`Erro ao salvar: ${error.error.message}`);
          console.log(error);
        }
      );
    } else {
      this._equipamentoService.updateEquipamento(this.equipamento).subscribe(
        (equipamento) => {
          console.log(equipamento);
          this.equipamentoForm.reset();
          alert("Equipamento atualizado com sucesso!");
          this._router.navigate(["/home/equipamentos"]);
        },
        (error: any) => {
          alert(`Erro ao atualizar: ${error.error.message}`);
          console.log(error);
        }
      );
    }
  }
}
