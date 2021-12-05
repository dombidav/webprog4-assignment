import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { TeamReadRoutingModule } from './team-read-routing.module'

import { TeamReadPage } from './team-read-page.component'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { DividerModule } from 'primeng/divider'
import { InputTextModule } from 'primeng/inputtext'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TeamReadRoutingModule,
        CardModule,
        ButtonModule,
        DialogModule,
        DividerModule,
        InputTextModule
    ],
  declarations: [ TeamReadPage ]
})
export class TeamReadPageModule {}
