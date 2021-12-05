import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ReadPageRoutingModule } from './read-routing.module'

import { UserReadPage } from './user-read-page.component'
import { CardModule } from 'primeng/card'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReadPageRoutingModule,
        CardModule
    ],
  declarations: [ UserReadPage ]
})
export class UserReadPageModule {}
