export interface Cliente {
  id?: number;
  nome: string;
  email: string;
  password: string;
  confirmarPassword?: string; // Este campo é opcional, usado apenas no cadastro
  contaInterna: ContaInter;
  contaExterna: ContaExt;
}

export interface ContaInter {

  banco: String,
  agencia: number,
  conta: number,
  saldo: number

}

export interface ContaExt {

  banco: String,
  agencia: number,
  conta: number,
  saldo: number

}