import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { UsersPageRoutingModule } from './users-routing.module'

import { UsersPage } from './users.page'
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button'
import { RippleModule } from 'primeng/ripple'
import { SharedModule } from 'primeng/api'
import { TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext'
import { DialogModule } from 'primeng/dialog'
import { DividerModule } from 'primeng/divider'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersPageRoutingModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    SharedModule,
    TableModule,
    InputTextModule,
    DialogModule,
    DividerModule
  ],
  declarations: [ UsersPage ]
})
export class UsersPageModule {}
