import { Component } from '@angular/core';
import { FsTextEditorConfig } from '@firestitch/text-editor';


@Component({
  selector: 'css-example',
  templateUrl: 'css.component.html'
})
export class CssComponent {
  public model = `.class {\n background-color: #ff0;\n}`;
  public config: FsTextEditorConfig = {
    language: 'css'
  };
}
