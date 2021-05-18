import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { NgbLoadingService } from './shared/controls/loading/loading.service';
import { AccessService } from './shared/services/access.service';

@Injectable()
export class AppHttpClientInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private accessSrv: AccessService,
    private loadingSrv: NgbLoadingService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.accessSrv.isAuthenticate()) {
      request = this.addToken(
        request,
        this.accessSrv.authorize.value.access_token
      );
    }

    return;
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handleError(
    error: any,
    request: HttpRequest<any>,
    next: HttpHandler
  ) {
    let errorMessage = "";
   if (error instanceof HttpErrorResponse && error.status === 0) {
      errorMessage = "Verifique sua conexão com a internet.";
      console.error(error);
    } else if (error instanceof HttpErrorResponse && error.status === 500) {
      errorMessage = "Ocorreu um erro. Tente novamente mais tarde.";
      console.error(error);
    } else if (error instanceof HttpErrorResponse && error.status === 400 && error.error.Value) {
      errorMessage = error.error.Value;
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    } else {
      console.error(error);
    }

    this.onCloseLoading();
    return throwError(errorMessage);
  }

  
  private onCloseLoading() {
    this.loadingSrv.close(true);
    this.loadingSrv.close(true);
    this.loadingSrv.close(true);
    this.loadingSrv.close(true);
  }
}
