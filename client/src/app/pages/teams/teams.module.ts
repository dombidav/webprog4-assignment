import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { TeamsPageRoutingModule } from './teams-routing.module'

import { TeamsPage } from './teams.page'
import { FileUploadModule } from 'primeng/fileupload'
import { ToolbarModule } from 'primeng/toolbar'
import { RippleModule } from 'primeng/ripple'
import { TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext'
import { DialogModule } from 'primeng/dialog'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { DividerModule } from 'primeng/divider'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TeamsPageRoutingModule,
        FileUploadModule,
        ToolbarModule,
        RippleModule,
        TableModule,
        InputTextModule,
        DialogModule,
        ConfirmDialogModule,
        DividerModule
    ],
  declarations: [ TeamsPage ]
})
export class TeamsPageModule {}
