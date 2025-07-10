import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessoComponent } from './sucesso.component';
import { Router } from '@angular/router';
import { ClienteService } from 'projects/shared-lib/src/lib/service/cliente.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Cliente } from 'projects/shared-lib/src/lib/models/cliente.model';

describe('SucessoComponent', () => {
  let component: SucessoComponent;
  let fixture: ComponentFixture<SucessoComponent>;
  let clienteService: ClienteService;
  let router: Router;
  let mockClienteService: any;

  beforeEach(async () => {

    clienteService = jasmine.createSpyObj('ClienteService', ['buscarPorEmail', 'salvar']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    mockClienteService = {
      buscarPorEmail: jasmine.createSpy().and.returnValue(of({
        nome: 'Teste Nome',
        email: 'teste@email.com',
        password: '123456',
        contaInterna: {
          banco: '236599',
          agencia: 123,
          conta: 23654,
          saldo: 500
        }, // Replace with a valid ContaInter object
        contaExterna: {
          banco: '789456',
          agencia: 321,
          conta: 456321,
          saldo: 1000
        } // Replace with a valid ContaExt object
      }))
    };

    await TestBed.configureTestingModule({
      imports: [SucessoComponent, HttpClientTestingModule],
      providers: [
        { provide: ClienteService, useValue: mockClienteService }
      ]
    });

    sessionStorage.setItem('email', 'teste@email.com');

    fixture = TestBed.createComponent(SucessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    sessionStorage.clear();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('deve buscar cliente se email existir no sessionStorage', () => {
    const fakeCliente: Cliente = {
      nome: 'Teste Nome',
      email: 'teste@email.com',
      password: '123456',
      contaInterna: {
        banco: '236599',
        agencia: 123,
        conta: 23654,
        saldo: 500
      }, // Replace with a valid ContaInter object
      contaExterna: {
        banco: '789456',
        agencia: 321,
        conta: 456321,
        saldo: 1000
      } // Replace with a valid ContaExt object
    };
    spyOn(sessionStorage, 'getItem').and.returnValue('teste@email.com');
    mockClienteService.buscarPorEmail.and.returnValue(of(fakeCliente));

    component.ngOnInit();

    expect(mockClienteService.buscarPorEmail).toHaveBeenCalledWith('teste@email.com');
    expect(component.cliente).toEqual(fakeCliente);
  });

  it('deve lançar erro se email não existir no sessionStorage', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    expect(() => component.ngOnInit()).toThrowError('Email não encontrado no sessionStorage!');
  });

  it('deve lançar erro se buscarPorEmail falhar', (done) => {
    spyOn(sessionStorage, 'getItem').and.returnValue('teste@email.com');
    mockClienteService.buscarPorEmail.and.returnValue(throwError(() => 'erro'));

    // Espione o método error para capturar o throw
    spyOn(component as any, 'ngOnInit').and.callThrough();

    // Redefina window.onerror para capturar o erro lançado
    const originalOnError = window.onerror;
    window.onerror = function (message) {
      expect(message.toString()).toContain('Erro ao buscar cliente');
      window.onerror = originalOnError;
      done();
      return true;
    };

    component.ngOnInit();
  });

  it('deve copiar conta interna para externa e zerar saldo da interna', () => {
    component.cliente = {
      contaInterna: { banco: '001', agencia: 1, conta: 1, saldo: 100 },
      contaExterna: { banco: '002', agencia: 2, conta: 2, saldo: 200 },
    } as any;

    component.copiarConta('interna');

    expect(component.cliente.contaExterna).toEqual({ banco: '001', agencia: 1, conta: 1, saldo: 100 });
    expect(component.cliente.contaInterna.saldo).toBe(0);
  });

  it('deve copiar conta externa para interna e zerar saldo da externa', () => {
    component.cliente = {
      contaInterna: { banco: '001', agencia: 1, conta: 1, saldo: 1000 },
      contaExterna: { banco: '002', agencia: 2, conta: 2, saldo: 200 },
    } as any;

    component.copiarConta('externa');

    expect(component.cliente.contaInterna).toEqual({ banco: '002', agencia: 2, conta: 2, saldo: 200 });
    expect(component.cliente.contaExterna.saldo).toBe(0);
  });

  it('deve transferir valor da conta interna para externa', () => {
    component.cliente = {
      contaInterna: { banco: '001', agencia: 1, conta: 1, saldo: 100 },
      contaExterna: { banco: '002', agencia: 2, conta: 2, saldo: 50 },
    } as any;
    component.valorTransferencia = 30;

    component.transferenciaValor('interna');

    expect(component.cliente.contaInterna.saldo).toBe(70);
    expect(component.cliente.contaExterna.saldo).toBe(80);
  });

  it('deve transferir valor da conta externa para interna', () => {
    component.cliente = {
      contaInterna: { banco: '001', agencia: 1, conta: 1, saldo: 20 },
      contaExterna: { banco: '002', agencia: 2, conta: 2, saldo: 100 },
    } as any;
    component.valorTransferencia = 50;

    component.transferenciaValor('externa');

    expect(component.cliente.contaExterna.saldo).toBe(50);
    expect(component.cliente.contaInterna.saldo).toBe(70);
    expect(component.valorTransferencia).toBe(0);
  });

  it('não deve transferir se saldo insuficiente na origem', () => {
    spyOn(window, 'alert');
    component.cliente = {
      contaInterna: { banco: '001', agencia: 1, conta: 1, saldo: 10 },
      contaExterna: { banco: '002', agencia: 2, conta: 2, saldo: 100 },
    } as any;
    component.valorTransferencia = 50;

    component.transferenciaValor('interna');

    expect(window.alert).toHaveBeenCalledWith('Saldo insuficiente na conta interna!');
    expect(component.cliente.contaInterna.saldo).toBe(10);
    expect(component.cliente.contaExterna.saldo).toBe(100);
  });

  it('não deve transferir se valorTransferencia for zero ou negativo', () => {
    component.cliente = {
      contaInterna: { banco: '001', agencia: 1, conta: 1, saldo: 100 },
      contaExterna: { banco: '002', agencia: 2, conta: 2, saldo: 100 },
    } as any;
    component.valorTransferencia = 0;

    component.transferenciaValor('interna');

    expect(component.cliente.contaInterna.saldo).toBe(100);
    expect(component.cliente.contaExterna.saldo).toBe(100);
  });


  it('deve limpar o sessionStorage e redirecionar para /login ao fazer logout', () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    component['router'] = routerSpy;

    spyOn(sessionStorage, 'clear');

    component.logout();

    expect(sessionStorage.clear).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });




});
