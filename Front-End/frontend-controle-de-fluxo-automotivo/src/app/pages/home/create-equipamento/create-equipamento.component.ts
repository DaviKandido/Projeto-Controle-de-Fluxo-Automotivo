import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Municipio } from 'src/app/models/municipio.model';
import { MunicipioService } from 'src/app/services/municipio.service';

@Component({
  selector: "app-create-equipamento",
  templateUrl: "./create-equipamento.component.html",
  styleUrls: ["./create-equipamento.component.scss"],
})
export class CreateEquipamentoComponent implements OnInit {
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

  private _estadoSelecionado: string;
  set estadoSelecionado(value: string) {
    if( value === this._estadoSelecionado ) return;
    if( !value ){
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

  constructor(private _municipioService: MunicipioService) {}

  ngOnInit(): void {
    this._municipioService.getMunicipios().subscribe(
      (municipios) => {
        this.municipios = municipios;
        this.municipiosExibidos = municipios;
      },
      (error: any) => console.log(error)
    );
  }
}
