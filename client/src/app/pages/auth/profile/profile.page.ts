import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/shared/services/auth.service'
import { PAGES, RedirectService } from '../../../shared/services/redirect.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: [ './profile.page.scss' ],
})
export class ProfilePage implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly redirect: RedirectService
  ) { }

  ngOnInit() {
    this.redirect.to(`${PAGES.users.url}/${this.authService.activeUser?.id}`)
  }

}
