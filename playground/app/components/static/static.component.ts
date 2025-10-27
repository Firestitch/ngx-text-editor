import { Component } from '@angular/core';
import { FsTextEditorConfig } from '@firestitch/text-editor';
import { FsTextEditorComponent } from '../../../../src/app/components/text-editor/text-editor.component';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'static-example',
    templateUrl: 'static.component.html',
    standalone: true,
    imports: [FsTextEditorComponent, FormsModule, JsonPipe]
})
export class StaticComponent {
  public model = `<html>\n <body>\n <h1> Hello World</h1>\n </body>\n</html>`;
  public config: FsTextEditorConfig = {
    language: 'html',
    readOnly: true,
  };
}
