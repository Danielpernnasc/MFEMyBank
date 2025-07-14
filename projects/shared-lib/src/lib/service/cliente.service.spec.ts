import { TestBed } from '@angular/core/testing';
import { ClienteService } from './cliente.service';
import { HttpClientModule } from '@angular/common/http';

;

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        ClienteService
      ]
    });
    service = TestBed.inject(ClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a defined salvar method', () => {
    expect(service.salvar).toBeDefined();
  }
  );

  it('should have a defined buscarPorEmail method', () => {
    expect(service.buscarPorEmail).toBeDefined();
  }
  );
});
