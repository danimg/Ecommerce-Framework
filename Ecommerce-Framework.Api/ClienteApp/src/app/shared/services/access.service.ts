import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccessService {

  temp: any;
  estabelecimentoId;
  estabelecimento;
  authenticate = new BehaviorSubject<boolean>(null);
  authorize = new BehaviorSubject<Token>(null);
  jwt = new BehaviorSubject<Dados>(null);
  profissionalId: number;

  constructor() {
    if (localStorage.getItem('authenticate') === 'true') {
      const authorize = localStorage.getItem('authorize');
      this.load(JSON.parse(authorize));
    }
  }

  public isAuthenticate(): boolean {
    return this.authenticate.value;
  }

  hasClaim(claimType: any): boolean {
    let permissao = true;
    const claims = this.jwt.value;
    if (claimType) {
      const array = claimType.split(':');
      if (array[1] === 'Liberado') {
        return true;
      } else {
        if (array[0] !== '' && array[0] !== undefined) {
          permissao = claims.hasOwnProperty(array[0]);
        }
        if (permissao && array[1] !== undefined && claims[array[0]] !== undefined) {
          if (Array.isArray(claims[array[0]])) {
            permissao = claims[array[0]].some(t => t === array[1]);
          } else {
            permissao = claims[array[0]] === array[1];
          }
        }
      }
      return permissao;
    }
  }

  public clearAll() {
    this.authenticate.next(null);
    this.authorize.next(null);
    localStorage.clear();
  }
  public load(result: Token) {
    if (result) {
    //  this.jwt.next(jwt_decode(result.access_token));
      this.authenticate.next(true);
      localStorage.setItem('authenticate', 'true');
      this.authorize.next(result);
      localStorage.setItem('authorize', JSON.stringify(this.authorize.value));
    }
  }
  public setAuthorize(result: Token) {
    this.authorize.next(result);
    localStorage.setItem('authorize', JSON.stringify(this.authorize.value));
  }
  public setAuthenticate(authenticate: boolean) {
    this.authenticate.next(authenticate);
    localStorage.setItem('authenticate', authenticate.toString());
  }
}
export interface Dados {
  username: string;
  userId: number;
  sessaoId: number;
  usuarioId: number;
  alterarSenha: string;
  estabelecimentoId: number;
  estabelecimento: string;
  usuarioMaster: string;
  profissionalId: number;
  ambiente: string;
  exp: number;
  iat: number;
  nbf: number;
  version: string;
  setorId?: number;
  cboId?: number;
  departamentoId?: number;
  cbo: string;
  localAtendimento: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
}
