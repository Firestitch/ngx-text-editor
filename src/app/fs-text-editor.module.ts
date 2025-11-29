import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FsTextEditorComponent } from './components/text-editor/text-editor.component';
import { NgxMonacoEditorConfig } from './modules/ngx-monaco-editor/config';
import { MonacoEditorModule } from './modules/ngx-monaco-editor/editor.module';


@NgModule({
  imports: [
    CommonModule,
    MonacoEditorModule,
    FormsModule,
    FsTextEditorComponent,
  ],
  exports: [
    FsTextEditorComponent,
  ],
})
export class FsTextEditorModule {
  public static forRoot(config?: NgxMonacoEditorConfig): ModuleWithProviders<FsTextEditorModule> {
    return {
      ngModule: FsTextEditorModule,
      providers: [
        MonacoEditorModule.forRoot(config).providers,
      ],
    };
  }
}
