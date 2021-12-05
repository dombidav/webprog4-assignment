import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ProjectReadPageRoutingModule } from './project-read-routing.module'

import { ProjectReadPage } from './project-read.page'
import {CardModule} from "primeng/card";
import {DragDropModule} from 'primeng/dragdrop';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {DividerModule} from "primeng/divider";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectReadPageRoutingModule,
    CardModule,
    DragDropModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DividerModule
  ],
  declarations: [ ProjectReadPage ]
})
export class ProjectReadPageModule {}
