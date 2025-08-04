import { Fluxo } from "./fluxo.model";
import { Integrador } from "./integrador.model";
import { Municipio } from "./municipio.model";


export class Equipamento {
  id?: number;
  codigo!: string;
  faixa!: number;
  tipo!: string;
  ativo!: boolean | 0 | 1;
  local!: string;
  marca!: string;
  modelo!: string;
  velocidadeLimite!: number;
  dataAfericao!: Date | string;
  lacre!: string;
  dataRegistroInmetro!: Date | string;
  numeroInmetro!: string;
  integradorId!: number;
  municipioId!: number;
  countFluxos?: number;
  Integrador?: Integrador;
  Municipio?: Municipio;
  Fluxos?: Fluxo[];
}