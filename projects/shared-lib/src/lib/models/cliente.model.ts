export interface Cliente {
  id?: number;
  nome: string;
  email: string;
  password: string;
  confirmarPassword?: string; // Este campo é opcional, usado apenas no cadastro
}
