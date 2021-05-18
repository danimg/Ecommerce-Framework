import { Inject, Injectable, Optional } from '@angular/core';
import { INgbLoadingConfig, NgbLoadingConfig } from './loading-config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgbLoadingService {
  public enabled = new BehaviorSubject<boolean>(false);
  public loadingConfig: INgbLoadingConfig;

  private contador = 0;
  constructor(@Optional() @Inject('loadingConfig') private config: INgbLoadingConfig) {
    this.loadingConfig = this.config || new NgbLoadingConfig();
  }

  public show() {
    this.contador++;
    this.enabled.next(true);
  }

  public close(force = false) {
    this.contador--;
    setTimeout(() => {
      if (this.contador <= 0 || force) {
        this.enabled.next(false);
        this.contador = 0;
      }
    }, 100);
  }
}
