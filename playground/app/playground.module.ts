import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsTextEditorModule } from '@firestitch/text-editor';

import { ToastrModule } from 'ngx-toastr';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { AppMaterialModule } from './material.module';
import {
  ExampleComponent,
  ExamplesComponent,
  CssComponent,
} from './components';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsTextEditorModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    RouterModule.forRoot(routes),
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    ExampleComponent,
    CssComponent,
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}
