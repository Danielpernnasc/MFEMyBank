import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        HttpClient
      ]
    });

  });
  service = TestBed.inject(AuthService);
});



it('should be created', () => {
  const service = TestBed.inject(AuthService);
  expect(service).toBeTruthy();
});

it('should login successfully', (done) => {
  const mockResponse = { token: 'fake-token' };
  const httpClient = TestBed.inject(HttpClient);
  const service = TestBed.inject(AuthService);
  spyOn(httpClient, 'post').and.returnValue(of(mockResponse));
  spyOn(sessionStorage, 'setItem');
  service.login('test@email.com', '123456').subscribe(success => {
    expect(success).toBeTrue();
    expect(sessionStorage.setItem).toHaveBeenCalledWith('authToken', 'fake-token');
    done();
  });

});
