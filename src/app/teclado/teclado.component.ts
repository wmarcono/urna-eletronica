import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.css']
})
export class TecladoComponent implements OnInit {

  constructor() { }

  @Output() botaoClicado = new EventEmitter();

  ngOnInit(): void {
  }

  clicou(n: string){
    this.botaoClicado.emit(n)
  }

  iniciarSecao(){}
}
