import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FsTextEditorConfig } from '@firestitch/text-editor';

import { FsTextEditorComponent } from '../../../../src/app/components/text-editor/text-editor.component';


@Component({
  selector: 'example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsTextEditorComponent,
    FormsModule,
    JsonPipe,
  ],
})
export class ExampleComponent {
  public model = '<html>\n  <body>\n    <h1>Hello World</h1>\n  </body>\n</html>';

  public config: FsTextEditorConfig = {
    language: 'html',
  };
}
