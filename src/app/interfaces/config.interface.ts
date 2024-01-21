import { editor } from 'monaco-editor';

export interface FsTextEditorConfig extends editor.IStandaloneEditorConstructionOptions {
  autoHeight?: boolean;
  ready?: (editor: editor.ICodeEditor) => void;
}
