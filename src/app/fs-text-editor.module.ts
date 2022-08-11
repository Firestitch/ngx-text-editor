import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { FsTextEditorComponent } from './components/text-editor/text-editor.component';


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
  ]
})
export class FsTextEditorModule {
  static forRoot(config?: NgxMonacoEditorConfig): ModuleWithProviders<FsTextEditorModule> {
    return {
      ngModule: FsTextEditorModule,
      providers: [
        MonacoEditorModule.forRoot(config).providers,
      ],
    };
  }
}
