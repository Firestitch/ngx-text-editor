import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild, inject } from '@angular/core';

import { Subscription } from 'rxjs';

import { editor } from 'monaco-editor';

import { NGX_MONACO_EDITOR_CONFIG } from './config';

let loadedMonaco = false;
let loadPromise: Promise<void>;

@Component({
  template: '',
})
export abstract class BaseEditor implements AfterViewInit, OnDestroy {

  @ViewChild('editorContainer', { static: true }) public _editorContainer: ElementRef;

  @Output() public onInit = new EventEmitter<any>();

  protected _editor: editor.ICodeEditor;
  protected _options: any;
  protected _windowResizeSubscription: Subscription;

  public config = inject(NGX_MONACO_EDITOR_CONFIG);

  public ngAfterViewInit(): void {
    if (loadedMonaco) {
      loadPromise.then(() => {
        this.initMonaco(this._options);
      });
    } else {
      loadedMonaco = true;
      loadPromise = new Promise<void>((resolve: any) => {
        const baseUrl = `${this.config.baseUrl || './assets'  }/monaco-editor/min/vs`;
        if (typeof ((<any>window).monaco) === 'object') {
          resolve();

          return;
        }
        const onGotAmdLoader: any = () => {
          // Load monaco
          (<any>window).require.config({ paths: { vs: `${baseUrl}` } });
          (<any>window).require(['vs/editor/editor.main'], () => {
            if (typeof this.config.onMonacoLoad === 'function') {
              this.config.onMonacoLoad();
            }
            this.initMonaco(this._options);
            resolve();
          });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
          const loaderScript: HTMLScriptElement = document.createElement('script');
          loaderScript.type = 'text/javascript';
          loaderScript.src = `${baseUrl}/loader.js`;
          loaderScript.addEventListener('load', onGotAmdLoader);
          document.body.appendChild(loaderScript);
        } else {
          onGotAmdLoader();
        }
      });
    }
  }

  public ngOnDestroy() {
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
    if (this._editor) {
      this._editor.dispose();
      this._editor = undefined;
    }
  }

  protected abstract initMonaco(options: any): void;
}
