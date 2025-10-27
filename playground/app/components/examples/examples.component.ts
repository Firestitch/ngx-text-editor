import { Component } from '@angular/core';
import { environment } from '@env';
import { FsExampleModule } from '@firestitch/example';
import { ExampleComponent } from '../example/example.component';
import { CssComponent } from '../css/css.component';
import { TypescriptComponent } from '../typescript/typescript.component';
import { StaticComponent } from '../static/static.component';

@Component({
    templateUrl: 'examples.component.html',
    standalone: true,
    imports: [FsExampleModule, ExampleComponent, CssComponent, TypescriptComponent, StaticComponent]
})
export class ExamplesComponent {
  public config = environment;
}
