import { editor } from 'monaco-editor';

export interface FsTextEditorConfig extends editor.IStandaloneEditorConstructionOptions {
  autoHeight?: boolean;
  height?: any;
  ready?: (editor: editor.ICodeEditor) => void;
}
