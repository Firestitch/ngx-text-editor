import { Component, ViewChild, OnInit } from '@angular/core';
import { FsTextEditorConfig } from '@firestitch/text-editor';
import { FsTextEditorComponent } from 'src/app/components/text-editor/text-editor.component';


@Component({
  selector: 'typescript-example',
  templateUrl: 'typescript.component.html'
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
