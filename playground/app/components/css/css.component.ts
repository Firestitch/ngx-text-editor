import { Component } from '@angular/core';

@Component({
  selector: 'css-example',
  templateUrl: 'css.component.html'
})
export class CssComponent {
  public model = ".class {\n background-color: #ff0;\n}";
  public config = {
    language: 'css'
  };
}
