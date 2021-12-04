import { Component, OnInit } from '@angular/core'
import { SwUpdate } from '@angular/service-worker'
import { PrimeNGConfig } from 'primeng/api'
import { TranslateService } from '@ngx-translate/core'
import { PAGES } from './shared/services/redirect.service'
import { AuthService } from './shared/services/auth.service'

/** Root component of the application */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ],
})
export class AppComponent implements OnInit {
  userName: string | undefined
  userEmail: string | undefined


  /**
   * @param swUpdate Service Worker update Handler
   * @param primeConfig [PrimeNG]{@link https://primefaces.org/primeng/showcase/#/setup} Configuration Object
   * @param translateService Service responsible for translations
   * @param authService Service responsible for authentication
   */
  constructor(
    private swUpdate: SwUpdate,
    private primeConfig: PrimeNGConfig,
    private translateService: TranslateService,
    public authService: AuthService,
  ) {
    this.checkServiceWorkerUpdate()
    this.userName = authService?.activeUser?.name
    this.userEmail = authService?.activeUser?.email
  }

  /** Checks if a newer version of this app is available */
  checkServiceWorkerUpdate() {
    this.swUpdate.available?.subscribe(() => {
      if (confirm('A new version is available. Load it?'))
        window.location.reload()
    })
  }

  /** Called when this component starts loading */
  ngOnInit() {
    this.primeConfig.ripple = true
    this.translate('hu')
    this.authService.tryLogin()
  }

  /**
   * Sets default language
   * @param lang language id ex. If the translation file is `hu.json` this should be 'hu'
   * @private
   */
  private translate(lang: string) {
    this.translateService.setDefaultLang('en')
    this.translateService.use(lang)
    this.translateService.get('primeng').subscribe(res => this.primeConfig.setTranslation(res))
  }

  get pages() {
    const result = []
    for (const key in PAGES) {
      if(PAGES[key].guard && PAGES[key].guard(this.authService))
        result.push(PAGES[key])
    }
    return result
  }
}
