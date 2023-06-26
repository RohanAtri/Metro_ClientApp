import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtInterceptor } from './services/jwt.interceptor';
import { AppShellComponent } from './app-shell/app-shell.component';
import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppConfigService } from './services/app-config.service';

export function init_app(appConfigService: AppConfigService) {
  return (): Promise<any> => {
    return appConfigService.loadAppConfig();
  }
}
@NgModule({
  declarations: [
    AppComponent,
    AppShellComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    NgbToastModule,
    SharedModule
  ],
  providers: [
    AppConfigService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppConfigService], multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
