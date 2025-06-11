import { CommonModule } from '@angular/common';
import { Component, importProvidersFrom } from '@angular/core';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Cliente } from 'projects/shared-lib/src/lib/models/cliente.model';



export const senhasIguaisValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const senha = group.get('senha')?.value;
  const confirmarSenha = group.get('confirmarSenha')?.value;

  return senha === confirmarSenha ? null : { senhasDiferentes: true };
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    CadastroRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [

    // Removed provideStore and provideEffects as they are now in main.ts
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  formCadastro: FormGroup;

  constructor(
    private form: FormBuilder,
    private store: Store
  ){


  this.formCadastro = this.form.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(6)]]
    }, { validators: senhasIguaisValidator });
  }

 

  onSubmit(): void {
    if (this.formCadastro.valid) {
      const novoCliente: Cliente = this.formCadastro.value;
      this.store.dispatch(cadastrarCliente({ cliente: novoCliente }));
      console.log('Dados do cadastro:', this.formCadastro.value);
    } else {
      console.log('Formulário inválido');
    }
  }

}
