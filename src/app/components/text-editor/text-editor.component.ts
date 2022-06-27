import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
  OnDestroy,
  Inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

import { EditorComponent } from 'ngx-monaco-editor';
import { editor } from 'monaco-editor';

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
export class FsTextEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() public config: FsTextEditorConfig = {};
  @Input() public scrollable = false;

  @Output() public init = new EventEmitter();
  @Output() public blur = new EventEmitter();
  @ViewChild(EditorComponent, { static: true }) _editorContainer: EditorComponent;

  public defaultConfig: FsTextEditorConfig = {
    minimap: {
      enabled: false
    },
    theme: 'vs-dark',
    automaticLayout: false,
    scrollBeyondLastLine: false,
    autoHeight: true,
    scrollbar: {
      vertical: 'hidden'
    },
    hideCursorInOverviewRuler: true
  };

  public onChange = (_: any) => {};
  public onTouched = () => {};

  private _window: any = this._document.defaultView;

  public get monaco() {
    return this._window.monaco;
  };

  constructor(
    private _element: ElementRef,
    @Inject(DOCUMENT)
    private _document: Document,
  ) {};

  public readonly LINE_HEIGHT = 18;

  private _editorRef: editor.ICodeEditor;
  private _value = '';

  public ngOnInit() {

    if (this.config) {
      this.config = Object.assign({}, this.defaultConfig, this.config);
    }
  }

  public ngOnDestroy() {
    // must be there to cleanup https://github.com/microsoft/monaco-editor/issues/827
    this._window.define = null;
  }

  get value() {
    return this._value;
  }

  public onEditorInit(event) {
    // Timeout allows the content to fully load to and calculate height
    setTimeout(() => {
      this._editorRef = event;
      this._initEditor();
      this.init.next(event);

      if (!this.scrollable) {
        this._disableScroll();
      }
    });
  }

  public writeValue(value: any): void {
    this._value = value || '';
  }

  public changed(e) {
    if (this._value !== e) {
      this._value = e;
      this.onChange(e);
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
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

      this._editorRef.onDidBlurEditorText(() => {
        this.blur.next();
      });
    }
  }

  private _updateEditorHeight() {

    const editorDomNode = this._editorRef.getDomNode();

    if (!editorDomNode) {
      return;
    }

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
    this.updateLayout();
  }

  public updateLayout(): void {
    this._editorRef.layout();
  }

  private _disableScroll() {
    const node = this._editorRef.getDomNode();

    node.addEventListener('wheel', (e) => {
      e.stopPropagation();
    }, true);
  }
}
