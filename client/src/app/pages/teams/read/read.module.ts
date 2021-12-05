import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ReadPageRoutingModule } from './read-routing.module'

import { ReadPage } from './read.page'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { DividerModule } from 'primeng/divider'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadPageRoutingModule,
    CardModule,
    ButtonModule,
    DialogModule,
    DividerModule
  ],
  declarations: [ ReadPage ]
})
export class ReadPageModule {}
