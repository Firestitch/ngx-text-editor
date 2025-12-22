import { JsonPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FsTextEditorConfig } from '@firestitch/text-editor';

import { FsTextEditorComponent } from 'src/app/components/text-editor/text-editor.component';

import { FsTextEditorComponent as FsTextEditorComponent_1 } from '../../../../src/app/components/text-editor/text-editor.component';


@Component({
  selector: 'typescript-example',
  templateUrl: './typescript.component.html',
  standalone: true,
  imports: [FsTextEditorComponent_1, FormsModule, JsonPipe],
})
export class TypescriptComponent {

  @ViewChild(FsTextEditorComponent, { static: true }) 
  public textEditor: FsTextEditorComponent;

  public model = '';
  public config: FsTextEditorConfig = {
    language: 'typescript',
    contextmenu: false,
  };

  public init(editor) {
    this.textEditor.monaco.languages.typescript.typescriptDefaults.addExtraLib('const testObject: { name: string, id: int };');
  }

  public blur() {
    console.log(this.model);
  }
}
