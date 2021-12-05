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
    loadChildren: () => import('./team-read/team-read.module').then(m => m.TeamReadPageModule)
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TeamsPageRoutingModule {}
