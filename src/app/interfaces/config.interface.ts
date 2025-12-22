import { editor } from 'monaco-editor';

export interface FsTextEditorConfig extends editor.IStandaloneEditorConstructionOptions {
  height?: any;
  ready?: (editor: editor.ICodeEditor, monaco: any) => void;
  destroy?: (editor: editor.ICodeEditor, monaco: any) => void;
  blur?: () => void;
  focus?: () => void;
  minHeight?: number;
}
