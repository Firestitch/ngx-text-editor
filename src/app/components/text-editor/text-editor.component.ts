import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { editor } from 'monaco-editor';

import { FsTextEditorConfig } from '../../interfaces/config.interface';


@Component({
  selector: 'fs-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsTextEditorComponent),
    multi: true,
  }],
})
export class FsTextEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {

  public readonly LINE_HEIGHT = 18;

  @Input() public config: FsTextEditorConfig = {};
  @Input() public scrollable = false;

  @Output() public ready = new EventEmitter();
  @Output() public blur = new EventEmitter();

  public onChange: (_: any) => void;
  public onTouched: () => void;

  private _editorRef: editor.ICodeEditor;
  private _value = '';
  private _window: any = this._document.defaultView;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
  ) {}

  public get monaco() {
    return this._window.monaco;
  }

  public ngOnInit() {
    if (this.config) {
      this.config = {
        minimap: {
          enabled: false,
        },
        theme: 'vs-dark',
        automaticLayout: !!this.config.height,
        scrollBeyondLastLine: false,
        scrollbar: {
          vertical: this.config.height ? 'auto' : 'hidden',
        },
        hideCursorInOverviewRuler: true,
        ...this.config,
      };
    }
  }

  public ngOnDestroy() {
    // must be there to cleanup https://github.com/microsoft/monaco-editor/issues/827
    this._window.define = null;
  }

  public get value() {
    return this._value;
  }

  public onEditorInit(event) {
    // Timeout allows the content to fully load to and calculate height
    setTimeout(() => {
      this._editorRef = event;
      this._initEditor();
      this.ready.next(event);

      if (!this.scrollable && !this.config.height) {
        this._disableScroll();
      }

      if(this.config.ready) {
        this.config.ready(this._editorRef);
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

  public updateLayout(): void {
    this._editorRef.layout();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private _initEditor() {
    if (this._editorRef && !this.config.height) {
      this._updateEditorHeight();

      this._editorRef.onDidChangeModelContent((e) => {
        this._updateEditorHeight();
      });
    }

    this._editorRef.onDidBlurEditorText(() => {
      this.blur.next();
      if(this.config.blur) {
        this.config.blur();
      }
    });
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
    editorDomNode.style.height = `${nextHeight  }px`;
    this.updateLayout();
  }

  private _disableScroll() {
    const node = this._editorRef.getDomNode();

    node.addEventListener('wheel', (e) => {
      e.stopPropagation();
    }, true);
  }
}
