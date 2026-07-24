import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { editor } from 'monaco-editor';

import { FsTextEditorConfig } from '../../interfaces/config.interface';
import { EditorComponent } from '../../modules/ngx-monaco-editor/editor.component';


@Component({
  selector: 'fs-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsTextEditorComponent),
    multi: true,
  }],
  standalone: true,
  imports: [EditorComponent, FormsModule],
})
export class FsTextEditorComponent implements OnInit, ControlValueAccessor, OnDestroy {

  @Input() public config: FsTextEditorConfig = {};
  @Input() public scrollable = false;

  @Output() public ready = new EventEmitter();
  @Output() public blur = new EventEmitter();

  public onChange: (_: any) => void;
  public onTouched: () => void;

  private _editorRef: editor.ICodeEditor;
  private _value = '';
  private _window: any;  
  private _document = inject<Document>(DOCUMENT);
  private _elementRef = inject(ElementRef);

  constructor() {
    this._window = this._document.defaultView;
  }

  public get monaco() {
    return this._window.monaco;
  }

  public ngOnInit() {
    if (this.config) {
      this.config = {
        minimap: {
          enabled: false,
        },
        minHeight: this.config.minHeight ?? 150,
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
    
    if (this.config.minHeight) {
      this._elementRef.nativeElement.style
        .setProperty('--min-height', `${this.config.minHeight}px`);
    }
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
        this.config.ready(this._editorRef, this.monaco);
      }
    });

    // moved forward for cases when several editors should be initialized on the same page
    // setTimeout(() => {
    //   this._cleanupAMDLoader();
    // }, 100);
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

  public ngOnDestroy(): void {
    if(this.config.destroy) {
      this.config.destroy(this._editorRef, this.monaco);
    }
  }

  private _initEditor() {
    if (this._editorRef && !this.config.height) {
      this._updateEditorHeight();

      // Fires for edits and for re-wrapping after a width change, unlike
      // onDidChangeModelContent which only covers edits
      this._editorRef.onDidContentSizeChange(() => {
        this._updateEditorHeight();
      });
    }

    this._editorRef.onDidBlurEditorText(() => {
      this.blur.next(null);
      if(this.config.blur) {
        this.config.blur();
      }
    });

    this._editorRef.onDidFocusEditorText(() => {
      if(this.config.focus) {
        this.config.focus();
      }
    });
  }

  private _updateEditorHeight() {
    const editorDomNode = this._editorRef.getDomNode();

    if (!editorDomNode || !this._editorRef.getModel()) {
      return;
    }

    // Content height counts wrapped rows, not just model lines, so a single
    // long line rendered with wordWrap is sized to what is actually drawn
    const nextHeight = this._editorRef.getContentHeight();

    // set the height and redo layout
    editorDomNode.style.height = `${nextHeight}px`;
    this.updateLayout();
  }

  private _disableScroll() {
    const node = this._editorRef.getDomNode();

    node.addEventListener('wheel', (e) => {
      e.stopPropagation();
    }, true);
  }
}
