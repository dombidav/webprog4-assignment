import { Component, OnDestroy, OnInit } from '@angular/core'
import { User } from '../../classes/User.entity'
import { Subscription } from 'rxjs'
import { ConfirmationService, MessageService } from 'primeng/api'
import { AuthService } from '../../shared/services/auth.service'
import { UserService } from './user.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: [ './users.page.scss' ],
})
export class UsersPage implements OnInit, OnDestroy {
  // section vars
  selectedItems: any[]
  items: User[]
  private items$: Subscription

  // section init
  constructor(
    private readonly itemService: UserService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
    public readonly authService: AuthService,
  ) { }

  ngOnInit() {
    this.init()
  }

  init() {
    if(this.items$) this.items$.unsubscribe()
    this.items$ = this.itemService.browse().subscribe(res => {
      this.items = res
    })
  }

  // section logic
  deleteSelectedItems() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the selected items?',
      accept: () => {
        this.selectedItems.forEach(item =>
          this.itemService.delete(item).subscribe(() => {
            this.items = this.items.filter(i => !this.selectedItems.includes(i))
            this.selectedItems = []
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item deleted' })
          }))
      }
    })
  }

  deleteItem(item: User) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this item?',
      accept: () => {
        this.itemService.delete(item).subscribe(() => {
          this.items = this.items.filter(i => i !== item)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item deleted' })
        })
      }
    })
  }

  // section destruct
  ngOnDestroy() {
    if(this.items$) this.items$.unsubscribe()
  }
}
