import { CommonModule } from '@angular/common';
import { Component, importProvidersFrom } from '@angular/core';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Cliente } from 'projects/shared-lib/src/lib/models/cliente.model';
import { ClienteService } from 'projects/shared-lib/src/lib/service/cliente.service';
import { AuthService } from 'projects/shared-lib/src/lib/authentic/service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';



export const senhasIguaisValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const repeatpassword = group.get('repeatpassword')?.value;

  return password === repeatpassword ? null : { senhasDiferentes: true };
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    CadastroRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
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
    private clienteService: ClienteService,
    private authService: AuthService,
    private router: Router
  ) {


    this.formCadastro = this.form.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatpassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validators: senhasIguaisValidator });
  }



  onSubmit(): void {

    if (this.formCadastro.valid) {
      const novoCliente: Cliente = this.formCadastro.value;
      this.clienteService.salvar(novoCliente).subscribe({
        next: (cliente) => {
          console.log('Cliente cadastrado com sucesso:', cliente);
          this.authService.login(cliente.email, cliente.password).subscribe({
            next: (autenticado) => {
              if (autenticado) {
                sessionStorage.setItem('email', cliente.email);
                this.router.navigate(['/sucesso']);
              } else {
                console.error('Falha ao autenticar após cadastro');
                this.router.navigate(['/login']); // fallback
              }
            }
          });
          this.formCadastro.reset();
        },
        error: (error) => {
          throw new Error(`Erro ao cadastrar cliente: ${error.message}`);
        }
      });
    } else {
      throw new Error('Formulário inválido');
    }
  }

}
