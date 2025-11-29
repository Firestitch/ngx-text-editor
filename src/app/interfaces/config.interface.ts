import { editor } from 'monaco-editor';

export interface FsTextEditorConfig extends editor.IStandaloneEditorConstructionOptions {
  height?: any;
  ready?: (editor: editor.ICodeEditor) => void;
  blur?: () => void;
  focus?: () => void;
  minHeight?: number;
}
