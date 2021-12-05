import { Component, OnInit } from '@angular/core'
import { User } from '../../../classes/User.entity'
import { ActivatedRoute } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { UserService } from '../user.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read-page.component.html',
  styleUrls: [ './user-read-page.component.scss' ],
})
export class UserReadPage implements OnInit {
  // section vars
  private userId: string
  public user: User
  private userId$: Subscription
  private user$: Subscription

  // section init
  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly message: MessageService,
    private readonly confirm: ConfirmationService,
  ) {
    this.userId$ = this.route.params.subscribe(params => this.userId = params.id)
  }

  ngOnInit() {
    this.user$ = this.userService.read(this.userId).subscribe(user => this.user = user)
  }

  // section destruct
  ngOnDestroy() {
    this.userId$?.unsubscribe()
    this.user$?.unsubscribe()
  }
}
