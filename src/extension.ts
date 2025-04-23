import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    // Command to add 4 spaces to the beginning of selected lines (skip empty lines)
    let addSpacesCommand = vscode.commands.registerCommand('nested.addIndent', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);

            // Add 4 spaces to the beginning of each line in the selection, but skip empty lines
            const indentedText = selectedText.split('\n').map(line => {
                // Skip empty lines
                if (line.trim() === "") {
                    return line; // Return the line unchanged if it's empty
                }
                return '    ' + line; // Add 4 spaces to non-empty lines
            }).join('\n');

            // Replace the selected text with the indented version
            editor.edit(editBuilder => {
                editBuilder.replace(selection, indentedText);
            });
        }
    });

    // Command to remove 4 spaces from the beginning of selected lines (skip empty lines)
    let removeSpacesCommand = vscode.commands.registerCommand('nested.removeIndent', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);

            // Remove 4 spaces from the beginning of each line in the selection, but skip empty lines
            const unindentedText = selectedText.split('\n').map(line => {
                // Skip empty lines
                if (line.trim() === "") {
                    return line; // Return the line unchanged if it's empty
                }
                // Remove 4 spaces from non-empty lines that start with 4 spaces
                return line.startsWith('    ') ? line.slice(4) : line;
            }).join('\n');

            // Replace the selected text with the unindented version
            editor.edit(editBuilder => {
                editBuilder.replace(selection, unindentedText);
            });
        }
    });

    context.subscriptions.push(addSpacesCommand, removeSpacesCommand);
}

export function deactivate() {}