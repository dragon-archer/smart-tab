'use strict';

const vscode = require('vscode');

function usesManualIndentation(editor) {
  return !!editor && !vscode.workspace.getConfiguration('editor', editor.document).get('detectIndentation');
}

function shiftIndentation(indentation, amount, tabSize) {
  let width = 0;
  for (const character of indentation) {
    width += character === '\t' ? tabSize - (width % tabSize) : 1;
  }

  width = Math.max(0, width + amount);
  return '\t'.repeat(Math.floor(width / tabSize)) + ' '.repeat(width % tabSize);
}

function shiftLines(editor, edit, direction) {
  const { document, options: { indentSize, tabSize } } = editor;
  const lines = new Set();

  for (const { start, end } of editor.selections) {
    const lastLine = end.line - Number(end.line > start.line && end.character === 0);
    for (let line = start.line; line <= lastLine; line++) {
      if (start.line === lastLine || !document.lineAt(line).isEmptyOrWhitespace) {
        lines.add(line);
      }
    }
  }

  for (const line of lines) {
    const indentation = /^[ \t]*/.exec(document.lineAt(line).text)[0];
    const shifted = shiftIndentation(indentation, direction * indentSize, tabSize);
    if (shifted === indentation) {
      continue;
    }

    const start = new vscode.Position(line, 0);
    if (indentation.length === 0) {
      edit.insert(start, shifted);
    } else {
      edit.replace(new vscode.Range(start, new vscode.Position(line, indentation.length)), shifted);
    }
  }
}

function indent() {
  const editor = vscode.window.activeTextEditor;
  if (!usesManualIndentation(editor)) {
    return;
  }

  const { document, selections } = editor;
  if (selections.some(({ active, isEmpty }) =>
    isEmpty && active.character > document.lineAt(active.line).firstNonWhitespaceCharacterIndex
  )) {
    return vscode.commands.executeCommand('tab');
  }

  return editor.edit(edit => shiftLines(editor, edit, 1));
}

function backspace() {
  const editor = vscode.window.activeTextEditor;
  if (!usesManualIndentation(editor)) {
    return vscode.commands.executeCommand('deleteLeft');
  }

  const { document, selections } = editor;
  if (!selections.every(({ active, isEmpty }) =>
    isEmpty && document.lineAt(active.line).text[active.character - 1] === '\t'
  )) {
    return vscode.commands.executeCommand('deleteLeft');
  }

  return editor.edit(edit => {
    for (const { active } of selections) {
      edit.delete(new vscode.Range(active.translate(0, -1), active));
    }
  });
}

function activate(context) {
  const updateIndentationContext = () => vscode.commands.executeCommand(
    'setContext', 'smartTab.manualIndentation', usesManualIndentation(vscode.window.activeTextEditor),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('smartTab.indent', indent),
    vscode.commands.registerCommand('smartTab.backspace', backspace),
    vscode.commands.registerTextEditorCommand('smartTab.outdent', (editor, edit) => {
      if (usesManualIndentation(editor)) {
        shiftLines(editor, edit, -1);
      }
    }),
    vscode.window.onDidChangeActiveTextEditor(updateIndentationContext),
    vscode.workspace.onDidChangeWorkspaceFolders(updateIndentationContext),
    vscode.workspace.onDidChangeConfiguration(event => {
      if (event.affectsConfiguration('editor.detectIndentation')) {
        return updateIndentationContext();
      }
    }),
  );

  return updateIndentationContext();
}

module.exports = { activate };
