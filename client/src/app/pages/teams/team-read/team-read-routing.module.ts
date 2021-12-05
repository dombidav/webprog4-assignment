import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TeamReadPage } from './team-read-page.component'

const routes: Routes = [
  {
    path: '',
    component: TeamReadPage
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TeamReadRoutingModule {}
