import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { UsersPage } from './users.page'

const routes: Routes = [
  {
    path: '',
    component: UsersPage
  },
  {
    path: ':id',
    loadChildren: () => import('./user-read/user-read.module').then(m => m.UserReadPageModule)
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class UsersPageRoutingModule {}
