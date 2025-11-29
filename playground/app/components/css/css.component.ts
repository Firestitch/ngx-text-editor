import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FsTextEditorConfig } from '@firestitch/text-editor';

import { FsTextEditorComponent } from '../../../../src/app/components/text-editor/text-editor.component';


@Component({
  selector: 'css-example',
  templateUrl: './css.component.html',
  standalone: true,
  imports: [FsTextEditorComponent, FormsModule, JsonPipe],
})
export class CssComponent {
  public model = '.class {\n background-color: #ff0;\n}';
  public config: FsTextEditorConfig = {
    language: 'css',
  };
}
