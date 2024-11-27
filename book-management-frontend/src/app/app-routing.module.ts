import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'add-book',
    loadChildren: () => import('./add-book/add-book.module').then(m => m.AddBookPageModule)
  },
  {
    path: 'book-details/:isbn',
    loadChildren: () => import('./book-details/book-details.module').then(m => m.BookDetailsPageModule)
  },
  {
    path: 'notes/:id',
    loadChildren: () => import('./notes/notes.module').then(m => m.NotesPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
