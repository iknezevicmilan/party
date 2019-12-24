import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainFormComponent } from './main-form/main-form.component';
import { MainGridComponent } from './main-grid/main-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    MainFormComponent,
    MainGridComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
