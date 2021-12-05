import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ProjectReadPageRoutingModule } from './project-read-routing.module'

import { ProjectReadPage } from './project-read.page'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectReadPageRoutingModule
  ],
  declarations: [ ProjectReadPage ]
})
export class ProjectReadPageModule {}
