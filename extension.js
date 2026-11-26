'use strict';

const vscode = require('vscode');

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
      lines.add(line);
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
  if (!editor) {
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

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('smartTab.indent', indent),
    vscode.commands.registerTextEditorCommand('smartTab.outdent', (editor, edit) => shiftLines(editor, edit, -1)),
  );
}

module.exports = { activate };
