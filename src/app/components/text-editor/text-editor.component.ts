import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'fs-text-editor',
  templateUrl: 'text-editor.component.html',
  styleUrls: [ 'text-editor.component.scss' ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsTextEditorComponent),
    multi: true
  }]
})
export class FsTextEditorComponent implements OnInit, ControlValueAccessor {

  @Input() public config = {};
  @Output() public init = new EventEmitter();

  public defaultConfig = {
    minimap: { enabled: false },
  };

  public propagateChange = (_: any) => {};
  public onTouched = () => {};

  private _value = '';

  constructor() {}

  public ngOnInit() {
    if (this.config) {
      this.config = Object.assign({}, this.defaultConfig, this.config);
    }
  }

  get value() {
    return this._value;
  }

  public onEditorInit(event) {
    this.init.next(event);
  }

  public writeValue(value: any): void {
    this._value = value || '';

    this.propagateChange(this._value);
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
