import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TeamsPage } from './teams.page'

const routes: Routes = [
  {
    path: '',
    component: TeamsPage
  },
  {
    path: ':id',
    loadChildren: () => import('./read/read.module').then( m => m.ReadPageModule)
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TeamsPageRoutingModule {}
