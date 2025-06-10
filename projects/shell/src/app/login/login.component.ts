import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'projects/shared-lib/src/lib/authentic/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ){

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (isAuthenticated: boolean) => {
          if (isAuthenticated) {
            // Navega para a rota protegida
            const rotaSucesso = this.router.navigate(['/sucesso']);
            console.log(rotaSucesso, 'Sucesso')
          } else {
            console.error('Erro ao logar: autenticação falhou');
            // Aqui você pode mostrar mensagem pro usuário
          }
        },
        error: (error) => {
          console.error('Erro ao logar:', error);
          // Aqui também pode mostrar feedback para o usuário
        }
      });
    }
  }



  cadastro(): void {
    this.router.navigate(['/cadastro']);
  }
}
