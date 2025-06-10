import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ){

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });

  }

  onSubmit(): void {
    if(this.loginForm.valid){
      console.log('Login data:', this.loginForm.value);
    }
  }

  cadastro(): void {
    this.router.navigate(['/cadastro']);
  }
}
