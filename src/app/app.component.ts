import { DadosService } from './dados.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public listaCandidatos
  public etapaAtual = 0;
  public numero = '';
  public etapa = [];
  public numeroClicado;
  public algarismos = [];
  public dadosCandidato = {numero: '', nome: '', vice: '', partido: '', fotos: [{url:'', legenda:''}]};
  public votoBranco = false
  public votoConfirmado = false;
  public votos = [];

  // TELA
  public seuVotoPara = false;
  public cargo = '';
  public mostrarNumeros = true;
  public mostrarDescricao = false;
  public mostrarAviso = false;
  public mostrarLateral = false;
  public votoNuloTela = false;
  public votoBrancoTela = false;
  public telaInicio = false;
  public telaAguardando = true;
  public telaFim = false;

  constructor( private dadosService: DadosService) { }

  ngOnInit(): void {
    this.dadosService.getCandidatos().subscribe(listajson=>{
      if(listajson)
      this.listaCandidatos = listajson;
      this.load();
     });

  }

  load(){
    this.comecarEtapa();
  }
  comecarEtapa() {
    this.cargo = this.listaCandidatos[this.etapaAtual].titulo;
    this.etapa = this.listaCandidatos[this.etapaAtual].numeros;
    this.algarismos = [];
    this.dadosCandidato = {numero: '', nome: '', vice: '', partido: '', fotos: [{url:'', legenda:''}]};
    this.seuVotoPara = false;
    this.mostrarNumeros = true;
    this.mostrarDescricao = false;
    this.mostrarAviso = false;
    this.mostrarLateral = false;
    this.votoNuloTela = false;
    this.votoBrancoTela = false;
    this.votoBranco = false;
  }

  atualizarTela() {
    if(this.listaCandidatos) {
      let candidato = this.listaCandidatos[this.etapaAtual].candidatos.filter((item)=>{
        if (item.numero === this.dadosCandidato.numero) return true;
        return false;
      });
      if(candidato.length > 0) {
          candidato = candidato[0];
          this.seuVotoPara = true;
          this.mostrarAviso = true;
          this.mostrarDescricao = true;
          this.mostrarLateral = true;
          this.dadosCandidato.nome = candidato.nome
          this.dadosCandidato.vice = candidato.vice
          this.dadosCandidato.partido = candidato.partido
          this.dadosCandidato.fotos = candidato.fotos
      } else {
          this.seuVotoPara = true;
          this.mostrarAviso = true;
          this.votoNuloTela = true;
      }
    }
  }

  clicou(numeroClicado) {
    switch (numeroClicado) {
      case "branco":
        this.votoEmBranco();
        break;
      case "corrige":
        this.corrige();
        break;
      case "confirma":
        this.confirma();
        break;
      default:
        this.botaoNumeros(numeroClicado);
    }
  }

  botaoNumeros(numeroClicado) {
    if (this.algarismos.length < this.etapa.length) {
      this.algarismos.push(numeroClicado);
    }
    if (this.algarismos.length === this.etapa.length) {
    this.dadosCandidato.numero = this.algarismos.join("");
    this.atualizarTela();
    }
  }

  votoEmBranco() {
    if(this.algarismos.length === 0) {
      this.votoBrancoTela = true;
      this.votoBranco = true;
      this.mostrarNumeros = false;
      this.seuVotoPara = true;
      this.mostrarAviso = true;
    }
  }

  corrige() {
      this.comecarEtapa();
  }

  confirma() {
    if(this.votoBranco === true) {
      this.votoConfirmado = true;
      this.votos.push({
        etapa: this.cargo,
        voto: 'branco'
      });
    }
    if(this.dadosCandidato.numero.length === this.etapa.length) {
      this.votoConfirmado = true;
      let votoNulo = this.listaCandidatos[this.etapaAtual].candidatos.filter((item)=>{
        if(item.numero === this.dadosCandidato.numero) return true;
        return false
    });
      this.votos.push({
        etapa: this.cargo,
        voto: votoNulo.length > 0 ? this.dadosCandidato.numero : 'nulo'
      });
    }
    if(this.votoConfirmado) {
      this.etapaAtual ++;
      this.votoBranco = false;
      if(this.etapa[this.etapaAtual] !== undefined) {
        this.comecarEtapa();
      } else {
        this.telaInicio = false
        this.telaFim = true;
        console.log(this.votos);
      }
    }
  }

  iniciarSecao(){
    this.telaInicio = true;
    this.telaAguardando = false;
    this.telaFim = false;
    this.etapaAtual = 0;
    this.comecarEtapa()
  }

}
