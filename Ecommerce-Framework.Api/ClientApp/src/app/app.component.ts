import { Component } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgbLoadingService } from './shared/controls/loading/loading.service';
import { AccessService } from './shared/services/access.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    private accessSrv: AccessService,
    private loadingSrv: NgbLoadingService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loadingSrv.show();
          break;
        }
        case event instanceof NavigationEnd: {
          this.loadingSrv.close();
          break;
        }
        case event instanceof NavigationError: {
          this.loadingSrv.close();
          break;
        }
      }
    });

    // this.accessSrv.authenticate.subscribe((authorized) => {
    //   if (!authorized) {
    //     this.loadingSrv.close();
    //     this.router.navigate(["/login"]);
    //   }
    // });

    window.addEventListener("storage", (e) => {
      this.accessSrv.load(JSON.parse(e.newValue));
    });
  }
}
