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
  submitted = false;
  mensagemErro = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }


  onSubmit(): void {
    this.submitted = true;
    this.mensagemErro = '';
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (isAuthenticated: boolean) => {
          if (isAuthenticated) {
            sessionStorage.setItem('email', email);
            this.router.navigate(['/sucesso']);
          } else {
            this.mensagemErro = 'Email ou senha incorretos.';
          }
        },
        error: () => {
          this.mensagemErro = 'Erro ao conectar ao servidor.';
        }
      });
    }
  }



  cadastro(): void {
    this.router.navigate(['/cadastro']);
  }
}
