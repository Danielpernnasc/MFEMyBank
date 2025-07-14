import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from 'projects/shared-lib/src/lib/authentic/service/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';


class AuthServiceMock {
  login = jasmine.createSpy().and.returnValue(of(true));
}

class RouterMock {
  navigate = jasmine.createSpy();
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthServiceMock;
  let router: RouterMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ], // Adicione esta linha
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useClass: RouterMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as any;
    router = TestBed.inject(Router) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onSubmit()', () => {
    component.loginForm.setValue({ email: 'test@email.com', password: '123456' });
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('test@email.com', '123456');
    expect(router.navigate).toHaveBeenCalledWith(['/sucesso']);
  });

  it('should cadastro()', () => {
    component.cadastro();
    expect(router.navigate).toHaveBeenCalledWith(['/cadastro']);
  })
});
