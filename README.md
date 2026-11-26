# Smart Tab

Use `Tab` and `Shift+Tab` to add or remove `editor.indentSize` columns of leading
indentation on each selected line. Each full `editor.tabSize` columns is stored
as a tab, followed by spaces for the remaining columns. With the defaults of 2
and 8, four presses of `Tab` produce one tab character. The next `Shift+Tab`
replaces it with six spaces.

The extension defaults `editor.detectIndentation` to `false` so that existing
file indentation does not override the configured widths. User and workspace
settings can override these defaults.

## License

MIT
