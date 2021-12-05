import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ProjectsPage } from './projects.page'

const routes: Routes = [
  {
    path: '',
    component: ProjectsPage
  },
  {
    path: ':id',
    loadChildren: () => import('./project-read/project-read.module').then( m => m.ProjectReadPageModule)
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ProjectsPageRoutingModule {}
