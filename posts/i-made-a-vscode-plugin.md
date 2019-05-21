---
path: '/posts/i-made-a-vscode-plugin'
date: 2019-05-21:17:25.962Z
title: 'I Made a Visual Studio Code Plugin'
---

I recently found [remove.bg](remove.bg), a really cool project. So I decided to
make a plugin for vscode that would allow me to right click an image and remove
the background from that image.

I have been switching back and forth between vscode and vim a lot lately but one
of the things that intrigued me with vscode was the fact that plugins were
written in JavaScript. JavaScript is one of those languages that a lot of people
love to hate - and sometimes I can even agree with the criticism.

The main reason, however, why I like JavaScript; and also the entire web stack,
is the fact that it runs everywhere. Knowledge in web technologies translates
when you want to write a Sketch plugin, a mobile app, a backend, a CLI,
a desktop app and of course a website.

But enough talking about JavaScript and lets get in to it!

### Starting Out

First of all I needed get the project started. To learn how to to this I
followed the
[Official Documentation](https://code.visualstudio.com/api/get-started/your-first-extension).
[Yeoman](https://www.yeoman.io/) is a project that I have looked at before so I
was pleasantly surprised that this was the tool that Microsoft decided to use
for their scaffolding.

From here I decided to do some research. I knew that [remove.bg] had HTTP API
that you could use but it got even better! There was already an
[npm package](https://www.npmjs.com/package/remove.bg) out there that handled it
all for me.

### Running It

So once the project was scaffolded I had to figure out how to run it. This was
by far the easiest step though. It was as easy as going to the debug tab and
press run. A new vscode window opened and in that window my plugin was already
installed and ready to use, NEAT!

### Wrapping it in Visual Studio Code

So for starters I knew that the API required an API key. It would be great if
that API key could be specified in the vscode settings. By adding these lines
to the _package.json_ file the setting called _Remove-bg: Api Key_ was added to
the settings menu in vscode:

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

The next step was to make the menu appear. This was an area that was,
unfortunately, less well documented but some trial and error lead med to this:

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

Okay so there is a lot to take in here so lets just start with the _command_
part. The command option tells vscode that this extension will provide a
command called _remove-bg.removeBg_; we will later on come to the part where
this command is implemented, so hang tight.

The next part is the _menu_ part. Here we define that we want to add an item
to the dropdown that is shown when the user rights click something in the
explorer tab. We specify a condition that it should only be displayed when the
user clicks something with a file extension that matched the regex

```javascript
/\.png$|\.jpg$|\.jpeg$/;
```

so basically an image that is not a vector image. We also specify that this menu
item should trigger the command that we specified in the _command_ part.

### Lets Get Coding!

So when I said that vscode plugins are made with JavaScript I wasn't lying - I
did however decide to use [Typescript](https://www.typescriptlang.org/) for this
and it is also the language that generally used to make vscode plugins.

In the src folder there is a file called _extension.ts_ this is the file that
will run once your extension is loaded. At first I knew that I would have to,
somehow, grab the API key that the user hopefully had specified in the settings

```typescript
function loadApiKey(): string | undefined {
  const config = vscode.workspace.getConfiguration('remove-bg');
  return config.get('apiKey');
}
```

The function above attempts to get the _apiKey_ from the settings and if it
fails to do so I return undefined.

Okay so next I decided that I didn't want to overwrite the file once the
background was removed but instead I wanted to create a new file.

I decided to add the suffix _-no-bg_ to the output file. For this I added a
utility function that would allow me to quickly change to something else if
I wanted to. That function looks like this:

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
this case it would be the thing that comes after the last dot.

So now that I had my initial building blocks I was able to stitch together the
the things using the
[Official Documentation](https://code.visualstudio.com/api/get-started/your-first-extension).

And this is the final code:

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
[here](https://marketplace.visualstudio.com/items?itemName=antonholmberg.remove-bg).
I actually decided to write the creators of [remove.bg](https://www.remove.bg/)
and ask them if it was okay for me to use their logo. They were completely fine
with this and actually responded very quickly.

This whole thing was a great learning experience and I regularly come up with
new ideas for vscode plugins - if only there were more hours in a day. I know
that this article might not have been the most educational things ever but
hopefully someone got inspired to make a plugin for a tool that they use
regularly. A lot of the times somethings as trivial as wrapping a tool that
someone else has made in order to make that tool easier to reach for is enough.

I would also like to make a shout out to the people working with
[remove.bg](https://www.remove.bg/) for being awesome enough to let me use their
logo and for taking their time replying to some random swede who made a vscode
plugin
