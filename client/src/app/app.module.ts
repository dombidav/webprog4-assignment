import { BrowserModule } from '@angular/platform-browser'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { ToastModule } from 'primeng/toast'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from './shared/shared.module'
import { StorageService } from './shared/services/storage.service'
import { ConfirmationService, MessageService } from 'primeng/api'
import { RedirectService } from './shared/services/redirect.service'
import { AuthInterceptor } from './http/interceptors/auth.interceptor'
import { IonicStorageModule } from '@ionic/storage-angular'
import { NgModule } from '@angular/core'
import { RouteReuseStrategy } from '@angular/router'
import { TeamService } from './pages/teams/team.service'
import { UserService } from './pages/users/user.service'
import { ProjectService } from './pages/projects/project.service'

/**
 * Initializes a new translation file loader through http
 * @param http Angular HTTP Client singleton
 */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

/** Root module */
@NgModule({
  declarations: [ AppComponent ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [ HttpClient ]
      },
      defaultLanguage: 'en'
    }),
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StorageService,
    MessageService,
    ConfirmationService,
    RedirectService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (redirect: RedirectService, storage: StorageService) => new AuthInterceptor(storage, redirect),
      multi: true,
      deps: [ RedirectService, StorageService ]
    },
    TeamService,
    UserService,
    ProjectService,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
