import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

/**
 * First level routes in the application. Handles lazy load and path matching.
 * @example
 * loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'teams',
    loadChildren: () => import('./pages/teams/teams.module').then( m => m.TeamsPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./pages/projects/projects.module').then( m => m.ProjectsPageModule)
  },
]

/** Handles first level routing and preloading strategies */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
