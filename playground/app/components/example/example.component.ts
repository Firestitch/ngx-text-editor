import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FsTextEditorConfig } from '@firestitch/text-editor';


@Component({
  selector: 'example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  public model = '<html>\n  <body>\n    <h1>Hello World</h1>\n  </body>\n</html>';

  public config: FsTextEditorConfig = {
    language: 'html',
    height: '100%',
  };
}
