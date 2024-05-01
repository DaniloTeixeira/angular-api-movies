import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptor } from './core/interceptors/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    NgOptimizedImage,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatIconModule,

    RouterModule.forRoot([]),
  ],
  providers: [provideHttpClient(withInterceptors([httpInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
