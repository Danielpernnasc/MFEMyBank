import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CadastroRoutingModule } from './cadastro-routing.module';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    CadastroRoutingModule,

  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

}
