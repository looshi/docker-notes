```sh
# VS Code settings
# linux location:
~/.config/Code/User/settings.json


# Basic launch json that works,
# might need to edit the program path if your folder setup varies
# The name is what will show up in the little dropdown next to the debug panel
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "looshi vscode debug",
      "request": "launch",
      "runtimeArgs": [],
      "program": "${workspaceRoot}/server.js",
      "cwd": "${workspaceRoot}",
      "type": "node"
    },
  ]
}
```
