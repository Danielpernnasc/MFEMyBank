import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { authGuard } from './auth.guard';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let originalGetItem: any;

  class RouterMock {
    navigate = jasmine.createSpy('navigate');
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useClass: RouterMock }
      ]
    }); // Inicializa o TestBed
    originalGetItem = sessionStorage.getItem;
  });

  afterEach(() => {
    sessionStorage.getItem = originalGetItem;
  });

  it('should allow access if token exists', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('fake-token');
    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    expect(result).toBeTrue();
  });

  it('should block access if token does not exist', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    expect(result).toBeFalse();
  });
});