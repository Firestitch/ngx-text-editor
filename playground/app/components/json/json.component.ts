import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FsTextEditorConfig } from '@firestitch/text-editor';

import { FsTextEditorComponent } from 'src/app/components/text-editor/text-editor.component';

import { FsTextEditorComponent as FsTextEditorComponent_1 } from '../../../../src/app/components/text-editor/text-editor.component';


@Component({
  selector: 'json-example',
  templateUrl: './json.component.html',
  standalone: true,
  imports: [FsTextEditorComponent_1, FormsModule, JsonPipe],
})
export class JsonComponent implements OnInit {

  @ViewChild(FsTextEditorComponent, { static: true }) 
  public textEditor: FsTextEditorComponent;

  public model = `{
    "name": "Alice",
    "age": 25
  }`;
  public config: FsTextEditorConfig;

  public ngOnInit(): void {
    const jsonSchema = {
      '$schema': 'http://json-schema.org/draft-07/schema#',
      'type': 'object',
      'properties': {
        'name': {
          'type': 'string',
        },
        'age': {
          'type': 'integer',
        },
      },
      'required': ['name', 'age'],
    };
  
    this.config = {
      language: 'json',
      ready: (editor, monaco) => {
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
          validate: true,
          schemas: [{
            uri: 'http://example.com/my-schema.json', 
            fileMatch: ['*'], 
            schema: jsonSchema,
          }],
        });
      },

      destroy: (editor, monaco) => {
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
          schemas: [],
        });
      },
      ...this.config,
    };
  }

  public init() {
    this.textEditor.monaco.languages.typescript.typescriptDefaults.addExtraLib('const testObject: { name: string, id: int };');
  }

  public blur() {
    console.log(this.model);
  }
}
