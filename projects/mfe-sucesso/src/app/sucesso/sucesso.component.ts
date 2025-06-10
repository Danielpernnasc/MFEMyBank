import { Component } from '@angular/core';
import { SucessoRoutingModule } from './sucesso-routing.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sucesso',
  templateUrl: './sucesso.component.html',
  styleUrls: ['./sucesso.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SucessoRoutingModule
  ]
})
export class SucessoComponent {

}
