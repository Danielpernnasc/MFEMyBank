import { Component, OnInit } from '@angular/core';
import { SucessoRoutingModule } from './sucesso-routing.module';
import { CommonModule } from '@angular/common';
import { Cliente } from 'projects/shared-lib/src/lib/models/cliente.model';
import { ClienteService } from 'projects/shared-lib/src/lib/service/cliente.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sucesso',
  templateUrl: './sucesso.component.html',
  styleUrls: ['./sucesso.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SucessoRoutingModule,
    FormsModule
  ]
})
export class SucessoComponent implements OnInit {
  cliente!: Cliente;
  valorTransferencia: number = 0;

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');

    if (email) {
      this.clienteService.buscarPorEmail(email)
        .subscribe({
          next: (cliente: Cliente) => {
            this.cliente = cliente;
            console.log(this.cliente, 'Cliente encontrado com sucesso!');
          },
          error: (error) => {
            console.error('Erro ao buscar cliente:', error);
          }
        });
    } else {
      console.error('Email não encontrado no localStorage!');
      // Redirecione ou mostre uma mensagem se necessário
    }
  }

  copiarConta(origem: 'interna' | 'externa'): void {
    if (!this.cliente) return;

    if (origem === 'interna') {
      this.cliente.contaExterna = { ...this.cliente.contaInterna };
      this.cliente.contaInterna.saldo = 0; // Zera a origem
    } else {
      this.cliente.contaInterna = { ...this.cliente.contaExterna };
      this.cliente.contaExterna.saldo = 0; // Zera a origem
    }
  }


  transferenciaValor(origem: 'interna' | 'externa'): void {

    if(!this.cliente || this.valorTransferencia <= 0) return;

    const valor = this.valorTransferencia;

    if(origem  === 'interna') {
      if(this.cliente.contaInterna.saldo >= valor) {
        this.cliente.contaInterna.saldo -= valor;
        this.cliente.contaExterna.saldo += valor;
      }else {
        alert('Saldo insuficiente na conta interna!');
      }
    } else {
      if(this.cliente.contaExterna.saldo >= valor) {
        this.cliente.contaExterna.saldo -= valor;
        this.cliente.contaInterna.saldo += valor;
    }else {
      alert('Saldo insuficiente na conta externa!');
    }
    this.valorTransferencia = 0;
  }
}


  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
