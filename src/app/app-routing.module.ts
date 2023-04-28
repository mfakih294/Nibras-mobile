import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'sync', loadChildren: './sync/sync.module#SyncPageModule' },
  { path: 'p', loadChildren: './p/p.module#PPageModule' },
  { path: 'g', loadChildren: './g/g.module#GPageModule' },
  { path: 'o', loadChildren: './o/o.module#OPageModule' },
  { path: 'r', loadChildren: './r/r.module#RPageModule' },
  { path: 'n', loadChildren: './n/n.module#NPageModule' },
  { path: 't', loadChildren: './t/t.module#TPageModule' },
  { path: 'w', loadChildren: './w/w.module#WPageModule' },
  { path: 'nws', loadChildren: './nws/nws.module#NwsPageModule' },
  { path: 'art', loadChildren: './art/art.module#ArtPageModule' },
  { path: 'todo', loadChildren: './todo/todo.module#TodoPageModule' },
  { path: 'k', loadChildren: './k/k.module#KPageModule' },
  { path: 'cal', loadChildren: './cal/cal.module#CalPageModule' },
  { path: 'e', loadChildren: './e/e.module#EPageModule' },
  { path: 'example-modal', loadChildren: './example-modal/example-modal.module#ExampleModalPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
