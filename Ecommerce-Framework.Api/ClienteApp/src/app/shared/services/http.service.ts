import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AccessService } from './access.service';
import { NgbLoadingService } from '../controls/loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient,
    private accessSrv: AccessService,
    private loadingSrv: NgbLoadingService) {
  }

  public url(controller: string, action: string = null, id: number = null, parameter: string = null) {
    let url = `${this.baseUrl}${controller}`;

    if (action) {
      url += `/${action}`;
    }

    if (id) {
      return `${url}/${id}`;
    }

    if (parameter) {
      return `${url}/${parameter}`;
    }

    return url;
  }

  private header() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
  }

  public findAuth<T>(controller: string, id: number, action: string = null) {
    return new Promise<T>((resolve, reject) => {

      const url = this.url(controller, action, id);

      this.http.get<T>(url, this.header()).subscribe(result => {
        resolve(result);
      }, error => reject(error));
    });
  }

  public getAuth<T>(controller: string, action: string = null, parameter: string = null) {
    return new Promise<T>((resolve, reject) => {
      const url = this.url(controller, action, null, parameter);
      this.http.get<T>(url, this.header()).subscribe((result: any) => {
        resolve(result);
      }, error => reject(error));
    });
  }

  public postAuth<T>(controller: string, body: any, action: string = null) {
    return new Promise<T>((resolve, reject) => {
      const url = this.url(controller, action);
      this.http.post<T>(url, body, this.header()).subscribe(result => {
        resolve(result);
      }, error => reject(error));
    });
  }

  public putAuth<T>(controller: string, id: number, body: any, action: string = null) {
    return new Promise<T>((resolve, reject) => {
      const url = this.url(controller, action, id);
      this.http.put<T>(url, body, this.header()).subscribe(result => {
        resolve(result);
      }, error => reject(error));
    });
  }

  public deleteAuth<T>(controller: string, id: number, action: string = null) {
    return new Promise<T>((resolve, reject) => {
      const url = this.url(controller, action, id);
      this.http.delete<T>(url, this.header()).subscribe(result => {
        resolve(result);
      }, error => reject(error));
    });
  }

  public find<T>(controller: string, id: number, action: string = null) {
    return new Promise<T>((resolve, reject) => {

      const url = this.url(controller, action, id);

      this.http.get<T>(url).subscribe(result => {
        resolve(result);
      }, error => reject(error));
    });
  }

  public get<T>(controller: string, action: string = null) {
    return new Promise<T>((resolve, reject) => {

      const url = this.url(controller, action);

      this.http.get<T>(url).subscribe(result => {
        resolve(result);
      }, error => reject(error));
    });
  }

  public post<T>(controller: string, body: any, action: string = null) {
    return new Promise<T>((resolve, reject) => {
      const url = this.url(controller, action);
      this.http.post<T>(url, body).subscribe(result => {
        resolve(result);
      }, error => reject(error));
    });
  }

  public put<T>(controller: string, id: number, body: any, action: string = null) {
    return new Promise<T>((resolve, reject) => {
      const url = this.url(controller, action, id);
      this.http.put<T>(url, body).subscribe(result => {
        resolve(result);
      }, error => reject(error));
    });
  }

  public delete<T>(controller: string, id: number, action: string = null) {
    return new Promise<T>((resolve, reject) => {
      const url = this.url(controller, action, id);
      this.http.delete<T>(url).subscribe(result => {
        resolve(result);
      }, error => reject(error));
    });
  }

  public getAuthObservable<T>(controller: string, action: string = null, parameter: string = null) {
    const url = this.url(controller, action, null, parameter);
    return this.http.get<T>(url, this.header());
  }
}
