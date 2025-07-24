export class Equipamento {
  id?: string | number;
  codigo!: string;
  faixa!: number;
  tipo!: string;
  ativo!: boolean;
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
  Integrador?: object;
  Municipio?: object;
  Fluxos?: object;
}