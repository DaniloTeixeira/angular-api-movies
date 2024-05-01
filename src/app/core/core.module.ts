import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer';
import { LoaderComponent } from './components/loader';
import { NavComponent } from './components/nav/nav.component';
import { RatingStarComponent } from './components/rating-star';
import { TrailerDialogComponent } from './components/trailer-dialog';
import { CoreRoutingModule } from './core-routing.module';
import { MovieDetailsComponent } from './pages/movie-details';
import { MovieListComponent } from './pages/movie-list';
import { NotFoundComponent } from './pages/not-found';
import { RoundPipe } from './pipes/round';

const COMPONENTS = [
  NavComponent,
  LoaderComponent,
  FooterComponent,
  NotFoundComponent,
  MovieListComponent,
  RatingStarComponent,
  MovieDetailsComponent,
  TrailerDialogComponent,
];

const MATERIAL_MODULES = [
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
];
@NgModule({
  declarations: [...COMPONENTS, RoundPipe],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    ...MATERIAL_MODULES,
  ],
  exports: [...COMPONENTS],
})
export class CoreModule {}
