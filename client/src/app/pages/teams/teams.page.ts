import { Component, OnDestroy, OnInit } from '@angular/core'
import { TeamService } from './team.service'
import { Team } from '../../classes/Team.entity'
import { ConfirmationService, MessageService } from 'primeng/api'
import { Subscription } from 'rxjs'
import { AuthService } from '../../shared/services/auth.service'

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: [ './teams.page.scss' ],
})
export class TeamsPage implements OnInit, OnDestroy {
  selectedItems: any[]
  items: Team[]
  itemDialog = false
  item: Team
  submitted = false
  private items$: Subscription

  constructor(
    private readonly itemService: TeamService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly authService: AuthService,
  ) { }

  ngOnInit() {
    this.init()
  }

  init() {
    if(this.items$) this.items$.unsubscribe()
    this.items$ = this.itemService.browse().subscribe(res => this.items = res)
  }

  openNewDialog() {
    this.item = new Team(null, '', null, this.authService.activeUser.id, null, null)
    this.submitted = false
    this.itemDialog = true
  }


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

  openEditDialog(item: Team) {
    this.item = item
    this.submitted = false
    this.itemDialog = true
  }

  deleteItem(item: Team) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this item?',
      accept: () => {
        this.itemService.delete(item.id).subscribe(() => {
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
      this.itemService.add(this.item).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item created' })
        this.itemDialog = false
      })
    }
    this.init()
  }

  ngOnDestroy() {
    if(this.items$) this.items$.unsubscribe()
  }
}
