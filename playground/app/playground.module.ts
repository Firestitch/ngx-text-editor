import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsTextEditorModule } from '@firestitch/text-editor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import {
  CssComponent,
  ExampleComponent,
  ExamplesComponent,
  StaticComponent,
} from './components';
import { TypescriptComponent } from './components/typescript';
import { AppMaterialModule } from './material.module';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FsTextEditorModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    ExampleComponent,
    CssComponent,
    StaticComponent,
    TypescriptComponent,
  ],
})
export class PlaygroundModule {
}
