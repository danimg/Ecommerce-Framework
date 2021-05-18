import { Injectable } from "@angular/core";
import { HttpService } from "src/app/shared/services/http.service";
import { UsuarioModel } from "../models/usuario.model";

const ENDPOINT = 'api/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private httpSrv: HttpService) { }

  find(id: number) {
    return this.httpSrv.findAuth<UsuarioModel>(ENDPOINT, id);
  }
  get() {
    return this.httpSrv.getAuth<UsuarioModel[]>(ENDPOINT);
  }
  post(model: UsuarioModel) {

    return this.httpSrv.postAuth<UsuarioModel>(ENDPOINT, model);
  }
  put(id: number, model: UsuarioModel) {
    return this.httpSrv.putAuth<UsuarioModel>(ENDPOINT, id, model);
  }
  
  delete(id: number) {
    return this.httpSrv.deleteAuth<UsuarioModel>(ENDPOINT, id);
  }
  

}
