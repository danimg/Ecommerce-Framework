import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ProdutoModel } from "../models/produto.model";
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })
  export class ProdutoService {
    baseURL = `${environment.mainUrlAPI}produto`;
    constructor(private http: HttpClient) { }
  
    getById(id: number) {
      return this.http.get<ProdutoModel>(`${this.baseURL}/${id}`);;
    }
    get() {
      return this.http.get<ProdutoModel[]>(this.baseURL);
    }
    post(model: ProdutoModel) {
  
      return this.http.post(this.baseURL, model);
    }
    put(id: number, model: ProdutoModel) {
      return this.http.put(`${this.baseURL}/${model.produtoId}`, model);
    }
    
    delete(id: number) {
      return this.http.delete(`${this.baseURL}/${id}`);
    }
  }