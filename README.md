# Smart Tab

When automatic indentation detection is off and the editor uses tabs, `Tab` and
`Shift+Tab` add or remove `editor.indentSize` columns of leading indentation on
each selected line. Each full `editor.tabSize` columns is stored as a tab,
followed by spaces for the remaining columns. With an indent size of 2 and a tab
size of 8, four presses of `Tab` produce one tab character. `Shift+Tab` reduces
it to six spaces. `Backspace` immediately after a tab deletes the whole tab
character. Other `Backspace` operations use VS Code's default behavior.

## Usage

You can install the latest version of the extension via
the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=dragon-archer.smart-tab).

Alternatively, open Visual Studio code, press `Ctrl+P` or `Cmd+P` and
type `ext install dragon-archer.smart-tab`.

Also, you may build the extension directly from source code
on [GitHub](https://github.com/dragon-archer/smart-tab).

### Settings

Smart Tab leaves VS Code's editor settings unchanged. With
`editor.detectIndentation` enabled (the default) or when the editor uses spaces,
`Tab`, `Shift+Tab`, and `Backspace` keep their built-in behavior.

For GNU Code Style, add these settings to **User Settings (JSON)** to apply them
globally, or to a repository's `.vscode/settings.json` to apply them only there:

```json
{
	"editor.indentSize": 2,
	"editor.tabSize": 8,
	"editor.insertSpaces": false,
	"editor.detectIndentation": false
}
```

### FAQ

#### How to turn off the plugin for a single file?

Click the `Indent using tabs: <n>` or `Indent using spaces: <n>` button in the
bottom right corner (status bar), and choose your desired indentation style.
Smart Tab will be disabled for that file (Even if you choosed the same setting,
e.g. `Indent using tabs: 8`).

Note that vscode will not remeber this setting once it's closed.

## License

MIT
