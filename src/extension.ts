'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let splitLine = vscode.commands.registerTextEditorCommand('line-to-column.splitLine', () => {
    const { start, end } = vscode.window.activeTextEditor.selection;
    const currentDocument = vscode.window.activeTextEditor.document;
    const selectedLineText = currentDocument.getText(new vscode.Range(start, end));
    const splittedLine = splitLineToColumn(selectedLineText);
    const editor = vscode.window.activeTextEditor;

    editor.edit(editBuilder => {
      editBuilder.delete(new vscode.Range(start, end));
    })
      .then(res => {
        if (res) {
          return editor.edit(editBuilder => {
            editBuilder.replace(new vscode.Position(start.line, 0), splittedLine)
          });
        }
      })
      .then(res => {
        console.log(res);
      });
  });

  context.subscriptions.push(splitLine);
}

export function deactivate() {
}

export function splitLineToColumn(line: String) {
  return line.replace(/\s/gm, '\r\n');
}
