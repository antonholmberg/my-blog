---
path: '/posts/i-made-a-vscode-plugin'
date: 2019-05-21:17:25.962Z
title: 'I Made a Visual Studio Code Plugin'
description: 'How I made a vscode plugin to replace backgrounds with alpha for images.'
---

I recently found [remove.bg](remove.bg). It is a really cool project that
allows you to (as the name suggests) remove the background from an image. So I
decided to make a plugin for vscode that would allow me to right click an
image and remove the background from that image.

I have been switching back and forth between vscode and vim a lot lately but one
of the things that intrigued me with vscode was the fact that plugins were
written in JavaScript.

The main reason why I like JavaScript, and also the entire web stack, is the
fact that it runs everywhere. Knowledge in JavaScript remain relevant even if
you want to write a Sketch plugin, a mobile app, a backend, a CLI or a desktop
app.

But enough talking about JavaScript and lets get in to it!

### Starting Out

First of all I needed start a project. To do this I followed the
[Official Documentation](https://code.visualstudio.com/api/get-started/your-first-extension).
Scaffolding of a new project can be done with [Yeoman](https://www.yeoman.io/).
[Yeoman](https://www.yeoman.io/) is a project that I have looked at before so I
was pleasantly surprised that this was the tool that Microsoft decided to use
for their scaffolding.

From here I decided to do some research. I knew that
[remove.bg](https://www.remove.bg/) had an HTTP API that I could use but it got
even better! There was already an
[npm package](https://www.npmjs.com/package/remove.bg) out there that handled it
all for me.

### Running an Extension

So once the project was scaffolded I had to figure out how to run it; this was
by far the easiest step. The whole process was as easy as going to the debug
tab and press run. A new vscode window opened and in that window my plugin was
already installed and ready to use, **NEAT!**

### Wrapping the NPM Package in Visual Studio Code

I started out by installing the NPM package. This was no harder than installing
a dependency for a regular node or web project.

```bash
npm install remove.bg
```

So, for starters, I knew that the API required an API key. So it would be great
if that API key could be specified in the vscode settings. By adding these lines
to the _package.json_ file the setting titled _Api Key_ was added to the
settings menu in vscode (under the section named _Remove-bg_):

```json
{
  "contributes": {
    "configuration": [
      {
        "title": "Remove.bg configuration",
        "properties": {
          "remove-bg.apiKey": {
            "type": "string",
            "description": "The API key for remove.bg"
          }
        }
      }
    ]
  }
}
```

The next step was to make the menu appear when you right click a file. This was,
unfortunately, less well documented but some trial and error lead me to this
solution:

```json
  "contributes": {
    ...
    "menus": {
      "explorer/context": [
        {
          "command": "remove-bg.removeBg",
          "when": "resourceExtname =~ /\\.png$|\\.jpg$|\\.jpeg$/",
          "group": "navigation"
        }
      ]
    },
    "commands": [
      {
        "command": "remove-bg.removeBg",
        "title": "Remove background"
      }
    ]
  },
```

Okay, there is a lot to take in here so lets just start with the _command_ part.
The command part tells vscode that this extension will provide a command
called _remove-bg.removeBg_; we will come to the part where this command is
implemented, so hang tight.

The next part is the _menu_ part. Here we define that we want to add an item
to the dropdown menu that is shown when the user rights click something in the
explorer tab. We provide a condition that it should only be displayed when the
user clicks something with a file extension that matched the regex:

```javascript
/\.png$|\.jpg$|\.jpeg$/;
```

So basically any image that is supported by [remove.bg](https://www.remove.bg).
We also specify that this menu item should trigger the command that we
specified in the _command_ section.

### Lets Write Some JavaScript!

So when I said that vscode plugins are made with JavaScript I wasn't lying - I
did however decide to use [Typescript](https://www.typescriptlang.org/) for this
and it is also the language that is generally used to make vscode plugins.

In the src folder of the scaffolded project there is a file called
_extension.ts_. This is the file that will run once your extension is loaded. At
first I knew that I would have to, somehow, grab the API key that the user
hopefully specified in the settings

```typescript
function loadApiKey(): string | undefined {
  const config = vscode.workspace.getConfiguration('remove-bg');
  return config.get('apiKey');
}
```

The function above attempts to get the _apiKey_ from the settings; if the
setting is not specified it returns undefined.

Okay so next up I decided that I didn't want to overwrite the file once the
background was removed but instead I wanted to create a new file. I decided to
add the suffix _-no-bg_ to the output file and to handle this I added a utility
function. This would allow me to quickly change to some other suffix/extension
if I wanted to; the function looks like this:

```typescript
interface SuffixConfig {
  path: string;
  suffix: string;
  extension: string;
}

export function addSuffix({ path, suffix, extension }: SuffixConfig): string {
  const dots = path.split('.');
  return `${dots.slice(0, -1).join('.')}${suffix}.${extension}`;
}
```

The wonky part here is the slice between zero and minus one. What this does is
return a new array where the last item in the original array is removed. In
this case the thing that comes after the last dot will be removed.

So now that I had my initial building blocks I was able to stitch together the
the pieces using the
[Official Documentation](https://code.visualstudio.com/api/get-started/your-first-extension) and the
[npm package](https://www.npmjs.com/package/remove.bg).

This is the final code in the _extensions.ts_ file:

```typescript
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'remove-bg.removeBg',
    async (uri: vscode.Uri) => {
      const apiKey = loadApiKey();
      if (!apiKey) {
        vscode.window.showErrorMessage('No API key was set.');
        return;
      }

      const sourceFile = uri.path;
      const outFile = addSuffix({
        path: sourceFile,
        suffix: '-no-bg',
        extension: 'png',
      });

      try {
        await removeBackgroundFromImageFile({
          path: sourceFile,
          apiKey: apiKey,
          outputFile: outFile,
          size: 'regular',
          type: 'auto',
        });

        vscode.window.showInformationMessage('Background remove successfully!');
      } catch (e) {
        vscode.window.showErrorMessage('Failed to remove background.');
      }
    },
  );

  context.subscriptions.push(disposable);
}
```

### Closing Thoughts

The plugin can be found
[here](https://marketplace.visualstudio.com/items?itemName=antonholmberg.remove-bg) and the code for the plugin is available
[here](https://github.com/antonholmberg/vscode-remove-bg) I actually decided to
write an email to the creators of [remove.bg](https://www.remove.bg/) to ask
them if it was okay for me to use their logo. They were completely fine
with this and actually responded very quickly.

This whole thing was a great learning experience and I regularly come up with
new ideas for vscode plugins - if only a day had more hours.

I know that this article might not have been the most educational things ever
but hopefully someone got inspired to make a plugin for a tool that they use
regularly. A lot of the times somethings as trivial as wrapping a tool that
someone else has made in order to make that tool easier to reach for is enough.

I would also like to make a shout out to the people working with
[remove.bg](https://www.remove.bg/) for being awesome enough to let me use their
logo and for setting aside time replying to some random swedish guy who made a
vscode plugin.
