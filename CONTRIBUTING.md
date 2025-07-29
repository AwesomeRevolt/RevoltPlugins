# Contributing to AwesomeRevolt Plugins

Thank you for your interest in contributing to AwesomeRevolt Plugins! We welcome all kinds of contributions - whether it's adding new plugins, or improving/bug fixing currently existing ones!

## Table of Contents

- [How to Contribute a Plugin](#how-to-contribute-a-plugin)
- [Plugin Metadata Format](#plugin-metadata-format)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

---

## How to Contribute a Plugin

1. **Fork** the [RevoltPlugins repository, Discovery branch](https://github.com/AwesomeRevolt/RevoltPlugins/tree/discovery).
2. Add your plugin folder inside the main directory with all necessary files.
3. Update the metadata file (`plugins.json`) that contains:
   - `name`
   - `author`
   - `description`
   - `repo` (Repository link)
   - `tags` (array of descriptive tags)
   - `featured` (Please do not use this, this is mainly for AR team plugins :3)
   - `image` (URL to an icon or screenshot, optional - otherwise set to "null")
4. Make sure your metadata follows the [Plugin Metadata Format](#plugin-metadata-format).
5. Submit a Pull Request describing your plugin and any relevant details.

---

## Plugin Metadata Format

Your plugin metadata should look like this:

```json
{
  "name": "ExamplePlugin",
  "author": "YourName",
  "description": "A brief summary of your plugin’s functionality.",
  "repo": "https://github.com/YourName/ExamplePlugin",
  "tags": ["feature", "utility"],
  "featured": false,
  "image": "https://link-to-your-plugin-image.png"
}
```

---

## Pull Request Process

1. Fork the repository and create your branch from `main`.
2. Make your changes in your branch.
3. Ensure your code passes linting and tests.
4. Submit a Pull Request with a clear description of your plugin, what it does, etc.

---

## Community

Join our community on Revolt Chat for discussions and help:

- [Click Me!!](https://app.revolt.chat/invite/6D33wdRz)