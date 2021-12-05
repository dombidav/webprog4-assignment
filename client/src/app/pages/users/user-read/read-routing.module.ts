import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { UserReadPage } from './user-read-page.component'

const routes: Routes = [
  {
    path: '',
    component: UserReadPage
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ReadPageRoutingModule {}
