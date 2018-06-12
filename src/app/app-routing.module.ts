import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import {DevelopersComponent} from './developers/developers.component';

const routes: Routes = [
  {
    path: '',
    component: DevelopersComponent
  },
  {
    path: 'developers/:id/posts',
    component: PostsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
