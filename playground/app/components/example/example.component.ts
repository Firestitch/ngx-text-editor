import { Component } from '@angular/core';

@Component({
  selector: 'example',
  templateUrl: 'example.component.html',
  styleUrls: ['example.component.scss']
})
export class ExampleComponent {
  public model = "<html>\n <body>\n <h1> Hello World</h1>\n </body>\n</html>";
  public config = {
    language: 'html',
  };
}
