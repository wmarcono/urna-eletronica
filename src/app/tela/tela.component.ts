import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tela',
  templateUrl: './tela.component.html',
  styleUrls: ['./tela.component.css']
})
export class TelaComponent implements OnInit, DoCheck {

@Input() telaInicio;
@Input() telaAguardando;
@Input() seuVotoPara;
@Input() cargo;
@Input() mostrarNumeros;
@Input() mostrarDescricao;
@Input() mostrarAviso;
@Input() mostrarLateral;
@Input() etapa;
@Input() algarismos;
@Input() dadosCandidato;
@Input() votoNuloTela;
@Input() votoBrancoTela;
@Input() telaFim;

public digitoClass = false

  constructor() { }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    if(this.algarismos.length < this.etapa.length){
      this.digitoClass = false
    } else {
      this.digitoClass = true;
    }

  }
}
