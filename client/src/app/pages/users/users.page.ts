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
  itemDialog = false
  item: User
  submitted = false
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
          this.itemService.delete(item.id).subscribe(() => {
            this.items = this.items.filter(i => !this.selectedItems.includes(i))
            this.selectedItems = []
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item deleted' })
          }))
      }
    })
  }

  openEditDialog(item: User) {
    this.item = item
    this.submitted = false
    this.itemDialog = true
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

  hideDialog() {
    this.itemDialog = false
    this.submitted = false
  }

  saveItem() {
    this.submitted = true
    if (this.item.id) {
      this.itemService.edit(this.item).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item updated' })
        this.itemDialog = false
      })
    } else {
      this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Unknown Item' })
      this.itemDialog = false
    }
    this.init()
  }

  // section destruct
  ngOnDestroy() {
    if(this.items$) this.items$.unsubscribe()
  }
}
