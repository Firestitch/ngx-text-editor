import { Component } from '@angular/core';

import { FsExampleModule } from '@firestitch/example';

import { environment } from '@env';

import { CssComponent } from '../css/css.component';
import { ExampleComponent } from '../example/example.component';
import { StaticComponent } from '../static/static.component';
import { TypescriptComponent } from '../typescript/typescript.component';

@Component({
  templateUrl: './examples.component.html',
  standalone: true,
  imports: [FsExampleModule, ExampleComponent, CssComponent, TypescriptComponent, StaticComponent],
})
export class ExamplesComponent {
  public config = environment;
}
