import { Component } from '@angular/core';
import { FsTextEditorConfig } from '@firestitch/text-editor';
import { FsTextEditorComponent } from '../../../../src/app/components/text-editor/text-editor.component';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'css-example',
    templateUrl: 'css.component.html',
    standalone: true,
    imports: [FsTextEditorComponent, FormsModule, JsonPipe]
})
export class CssComponent {
  public model = `.class {\n background-color: #ff0;\n}`;
  public config: FsTextEditorConfig = {
    language: 'css'
  };
}
