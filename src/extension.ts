import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    // Command to add 4 spaces to the beginning of selected lines
    let addSpacesCommand = vscode.commands.registerCommand('nested.addIndent', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);

            // Add 4 spaces to the beginning of each line in the selection
            const indentedText = selectedText.split('\n').map(line => '    ' + line).join('\n');

            // Replace the selected text with the indented version
            editor.edit(editBuilder => {
                editBuilder.replace(selection, indentedText);
            });
        }
    });

    // Command to remove 4 spaces from the beginning of selected lines
    let removeSpacesCommand = vscode.commands.registerCommand('nested.removeIndent', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);

            // Remove 4 spaces from the beginning of each line in the selection
            const unindentedText = selectedText.split('\n').map(line => line.startsWith('    ') ? line.slice(4) : line).join('\n');

            // Replace the selected text with the unindented version
            editor.edit(editBuilder => {
                editBuilder.replace(selection, unindentedText);
            });
        }
    });

    context.subscriptions.push(addSpacesCommand, removeSpacesCommand);
}

export function deactivate() {}