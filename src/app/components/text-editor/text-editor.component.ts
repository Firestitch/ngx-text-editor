import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EditorComponent } from 'ngx-monaco-editor';

import ICodeEditor = monaco.editor.ICodeEditor;
import { FsTextEditorConfig } from '../../interfaces/config.interface';


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

  @Input() public config: FsTextEditorConfig = {};
  @Input() public scrollable = false;

  @Output() public init = new EventEmitter();
  @ViewChild('ngxMonacoEditor') _editorContainer: EditorComponent;

  public defaultConfig = {
    minimap: {
      enabled: false
    },
    theme: 'vs-dark',
    automaticLayout: true,
    autoHeight: true,
  };

  public propagateChange = (_: any) => {};
  public onTouched = () => {};

  public readonly LINE_HEIGHT = 18;

  private _editorRef: ICodeEditor;
  private _value = '';

  // Count of lines for apply auto height for editor
  private _lineCount = 0;

  constructor() {

  }

  public ngOnInit() {

    if (this.config) {
      this.config = Object.assign({}, this.defaultConfig, this.config);
    }
  }

  get value() {
    return this._value;
  }

  public onEditorInit(event) {
    this._editorRef = event;
    this._initEditor();
    this.init.next(event);

    if (!this.scrollable) {
      this._disableScroll();
    }
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

  private _initEditor() {
    if (this._editorRef && this.config.autoHeight) {
      this._updateEditorHeight();

      this._editorRef.onDidChangeModelContent((e) => {
        this._updateEditorHeight();
      });
    }
  }

  private _updateEditorHeight() {
    const editorDomNode = this._editorRef.getDomNode();

    if (!editorDomNode) { return; }

    const container = editorDomNode.getElementsByClassName('view-lines')[0] as HTMLElement;
    const lineHeight = container.firstChild
      ? (container.firstChild as HTMLElement).offsetHeight
      : this.LINE_HEIGHT;

    const editorModel = this._editorRef.getModel();

    if (!editorModel) {
      return;
    }

    const nextHeight = this._editorRef.getModel().getLineCount() * lineHeight;

    // set the height and redo layout
    editorDomNode.style.height = nextHeight + 'px';
    this._editorRef.layout();
  }


  private _disableScroll() {
    const node = this._editorRef.getDomNode();

    node.addEventListener('wheel', (e) => {
      e.stopPropagation();
    }, true);
  }
}
