> [!IMPORTANT]
> Thank you for your interest in contributing! Please follow these guidelines to ensure consistency and maintainability.

# Code Formatting

Use Prettier with the project's configuration to format code.
Either use the [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) or run the following command before committing changes:

```sh
npm run code:format
```

# Linting

Ensure your code has zero ESLint issues.
Either use the [ESLint VS Code extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) or run the following command to see if there are any issues to fix before submitting a pull request:

```sh
npm run code:lint
```

# Documentation

All public methods, variables and types or interfaces must be fully documented using TSDoc.
Inline comments should be added where necessary to improve code clarity.
