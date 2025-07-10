import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroComponent } from './cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from 'projects/shared-lib/src/lib/authentic/service/auth.service';
import { ClienteService } from 'projects/shared-lib/src/lib/service/cliente.service';
import { of } from 'rxjs';

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let clienteService: jasmine.SpyObj<ClienteService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CadastroComponent
      ],
      providers: [
        { provide: ClienteService, useValue: jasmine.createSpyObj('ClienteService', ['salvar']) },
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['login']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]

    })
      .compileComponents();

    clienteService = TestBed.inject(ClienteService) as jasmine.SpyObj<ClienteService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    component = TestBed.createComponent(CadastroComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize onSubmit with a valid form', () => {
    const fakeCliente = { email: 'test@email.com', password: '123456' } as any;
    component.formCadastro.setValue({
      nome: 'Teste',
      email: 'test@email.com',
      password: '123456',
      repeatpassword: '123456'
    });

    clienteService.salvar.and.returnValue(of(fakeCliente));
    authService.login.and.returnValue(of(true));

    spyOn(sessionStorage, 'setItem');

    component.onSubmit();

    expect(clienteService.salvar).toHaveBeenCalledWith(jasmine.objectContaining({ email: 'test@email.com' }));
    expect(authService.login).toHaveBeenCalledWith('test@email.com', '123456');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('email', 'test@email.com');
    expect(router.navigate).toHaveBeenCalledWith(['/sucesso']);
  });


  it('should navigate to /login if authentication fails after cadastro', () => {
    const fakeCliente = { email: 'test@email.com', password: '123456' } as any;
    component.formCadastro.setValue({
      nome: 'Teste',
      email: 'test@email.com',
      password: '123456',
      repeatpassword: '123456'
    });

    clienteService.salvar.and.returnValue(of(fakeCliente));
    authService.login.and.returnValue(of(false)); // Simula falha no login

    component.onSubmit();

    expect(clienteService.salvar).toHaveBeenCalledWith(jasmine.objectContaining({ email: 'test@email.com' }));
    expect(authService.login).toHaveBeenCalledWith('test@email.com', '123456');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

});
