import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpClientInterceptor } from './app-http-client.interceptor';
import { AccessService } from './shared/services/access.service';
import { HttpService } from './shared/services/http.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbIconModule } from './shared/controls/icon/icon.module';
import { NgbLoadingModule } from './shared/controls/loading/loading.module';
import { NgbMessageModule } from './shared/controls/message/message.module';
import { NavBarControlModule } from './shared/controls/navbar/navbar.module';
import { SidebarControlModule } from './shared/controls/sidebar/sidebar.module';
import { NgbToastsModule } from './shared/controls/toasts/toasts.module';

@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    NavBarControlModule,
    NgbToastsModule,
    NgbLoadingModule,
    NgbIconModule,
    SidebarControlModule,
    NgbMessageModule,   
  ],
  providers: [
    HttpService,
    AccessService,
   { provide: LOCALE_ID, useValue: "pt" },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpClientInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
