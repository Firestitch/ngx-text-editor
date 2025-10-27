import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FsTextEditorComponent } from './components/text-editor/text-editor.component';
import { MonacoEditorModule } from './modules/ngx-monaco-editor/editor.module';
import { NgxMonacoEditorConfig } from './modules/ngx-monaco-editor/config';


@NgModule({
    imports: [
        CommonModule,
        MonacoEditorModule,
        FormsModule,
        FsTextEditorComponent,
    ],
    exports: [
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
