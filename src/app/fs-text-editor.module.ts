import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FsTextEditorComponent } from './components/text-editor/text-editor.component';
// import { FsComponentService } from './services';

@NgModule({
  imports: [
    CommonModule,
    MonacoEditorModule,
    FormsModule,
  ],
  exports: [
    FsTextEditorComponent,
  ],
  entryComponents: [
  ],
  declarations: [
    FsTextEditorComponent,
  ],
  providers: [
    // FsComponentService,
  ],
})
export class FsTextEditorModule {
  /*static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsComponentModule,
      // providers: [FsComponentService]
    };
  }*/
}
