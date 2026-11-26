# Smart Tab

When automatic indentation detection is off, `Tab` and `Shift+Tab` add or remove
`editor.indentSize` columns of leading indentation on each selected line. Each
full `editor.tabSize` columns is stored as a tab, followed by spaces for the
remaining columns. With an indent size of 2 and a tab size of 8, four presses of
`Tab` produce one tab character. `Shift+Tab` reduces it to six spaces.
`Backspace` immediately after a tab deletes the whole tab character. Other
Backspace operations use VS Code's default behavior.

## Settings

Smart Tab leaves VS Code's editor settings unchanged. With
`editor.detectIndentation` enabled (the default), `Tab`, `Shift+Tab`, and
`Backspace` keep their built-in behavior.

For GNU Code Style, add these settings to **User Settings (JSON)** to apply them
globally, or to a repository's `.vscode/settings.json` to apply them only there:

```json
{
	"editor.indentSize": 2,
	"editor.tabSize": 8,
	"editor.detectIndentation": false
}
```

Disabling indentation detection keeps the configured widths in effect when
opening existing files.

## Usage

You can install the latest version of the extension via
the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=dragon-archer.smart-tab).

Alternatively, open Visual Studio code, press `Ctrl+P` or `Cmd+P` and
type `ext install dragon-archer.smart-tab`.

Also, you may build the extension directly from source code
on [GitHub](https://github.com/dragon-archer/smart-tab).

## License

MIT
