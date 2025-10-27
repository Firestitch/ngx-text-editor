import { Component, ViewChild, OnInit } from '@angular/core';
import { FsTextEditorConfig } from '@firestitch/text-editor';
import { FsTextEditorComponent } from 'src/app/components/text-editor/text-editor.component';
import { FsTextEditorComponent as FsTextEditorComponent_1 } from '../../../../src/app/components/text-editor/text-editor.component';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'typescript-example',
    templateUrl: 'typescript.component.html',
    standalone: true,
    imports: [FsTextEditorComponent_1, FormsModule, JsonPipe]
})
export class TypescriptComponent {

  @ViewChild(FsTextEditorComponent, { static: true }) textEditor: FsTextEditorComponent;

  public model = ``;
  public config: FsTextEditorConfig = {
    language: 'typescript',
    contextmenu: false
  };

  init(editor) {
    this.textEditor.monaco.languages.typescript.typescriptDefaults.addExtraLib('const testObject: { name: string, id: int };');
  }

  blur() {
    console.log(this.model);
  }
}
