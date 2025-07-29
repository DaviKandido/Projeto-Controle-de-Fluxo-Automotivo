import { Time } from "@angular/common"
import { Equipamento } from "./equipamento.model"

export class Fluxo{
    id: number
    seq: number
    data: Date
    hora: any
    placa: string
    velMed: number
    tamVeic: number
    classVeic: string
    pesoBt: number
    dataRecebimento: Date
    equipamentoId: number
    Equipamento?: Equipamento
} 