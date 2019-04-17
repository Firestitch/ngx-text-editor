import { Component } from '@angular/core';
import { FsTextEditorConfig } from '@firestitch/text-editor';

@Component({
  selector: 'static-example',
  templateUrl: 'static.component.html'
})
export class StaticComponent {
  public model = `<html>\n <body>\n <h1> Hello World</h1>\n </body>\n</html>`;
  public config: FsTextEditorConfig = {
    language: 'html',
    readOnly: true,
  };
}
