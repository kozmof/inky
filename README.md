# Caution!
This branch is under developing. Electron was upgraded from 4.2.0 to 24.2.0 but not completed because it is `nodeIntegration: true` and `contextIsolation: false`. So it still has security concerns.

![](resources/icon-small.jpg)

# Inky

**Inky** is an editor for [ink](http://www.inklestudios.com/ink), inkle's markup language for writing interactive narrative in games, as used in [80 Days](http://www.inklestudios.com/80days). It's an IDE (integrated development environment), because it gives you a single app that lets you play in the editor as you write, and fix any bugs in your code.

![](resources/screenshot.gif)

## Features

- **Play as you write**: The play pane remembers the choices that you made, so when Inky recompiles, it fast-forwards to the last point you were at in the flow.
- **Syntax highlighting**
- **As-you-type error highlighting**. Inky is constantly compiling, allowing you to fix errors early.
- **Issue browser**: Lists errors, warnings and TODOs in your **ink**,  and allows you to jump to the exact line number and file in the source.
- **Jump to definition**: Divert targets (like `-> theStreet`) are hyperlinked can be followed by alt-clicking.
- **Support multi-file projects**: - Inky automatically infers your story's structure from the `INCLUDE` lines, meaning that there's no need for an additional project file. To create a new include file, simply type `INCLUDE yourfile.ink` where you want to include it.
- **Export to JSON**: Although this isn't necessary if you're using the [ink-Unity-integration plugin](https://www.assetstore.unity3d.com/en/#!/content/60055), Inky allows you to export to ink's compiled JSON format, which is especially useful in other ink runtime implementations, such as [inkjs](https://github.com/y-lohse/inkjs), for running **ink** on the web.
- **File watching**: Modern text editors, including Inky, watch for changes to files on disk, so that if you change them it reflects those changes. This is especially helpful if you keep your **ink** in source control.

## Project status

Inky has been used extensively on multiple projects by different developers. Nevertheless, it isn't as robust or feature complete as many other text editors you may have used, since it's specialist software made by game developers in their spare time.

The informal [TODO.md](TODO.md) lists some missing features and known issues. If you want to discuss one, or request a new fix or feature, please [create a github issue](http://www.github.com/inkle/inky/issues).

To keep up to date with the latest news about ink [sign up for the mailing list](http://www.inklestudios.com/ink#signup).

## Download

### Mac, Windows and Linux

[Download the latest release](http://www.github.com/inkle/inky/releases/latest)

## Project settings file

**Warning: For the technically inclined - you need to understand what a JSON file is to do the following!**

To customise Inky settings for your specific ink project, create a JSON file with the same name as your main ink file, except with a `.settings.json` extension. For example, if your main ink file is called `my_great_story.ink`, then name your JSON file `my_great_story.settings.json`.

Here is an example settings file:

    {
        "customInkSnippets": [
            {
                "name": "Heaven's Vault",
                "submenu": [
                    {
                        "name": "Camera",
                        "ink": ">>> CAMERA: Wide shot"
                    },
                    {
                        "separator": true
                    },
                    {
                        "name": "Walk",
                        "ink": ">>> WALK: TheInscription"
                    },
                    {
                        "name": "More snippets",
                        "submenu": [
                            {
                                "name": "A snippet in a submenu",
                                "ink": "This snippet of ink came from a submenu."
                            },
                        ]
                    }
                ]
            }
        ],

        "instructionPrefix": ">>>"
    }

* `customInkSnippets` - this array allows your to add your own project-specific ink snippets to the Ink menu. There are three types of item you can add to the array:
    * **An ink snippet**: Requires `name` for the name of the menu item and `ink` for the snippet of ink it will insert into the editor.
    * **A separator**: Use `{"separator": true}` to add a horizonal line separator into the menu at this point.
    * **A sub-menu**: To nest more snippets into a sub-menu, use `name` for the sub-menu name, and then `submenu` with another array in the same format.


* `instructionPrefix` - A common convention is to use a particular text format in ink to instruct the game to perform certain actions rather than presenting the text verbatim to players.

    For example, at inkle we would write something like `>>> CAMERA: BigSwoop` in ink. The `>>>` isn't directly built into ink, and this entire text is simply passed through as plain text. But we have custom game code to interpret it and turn it into an action that takes place in-game. To help support this within Inky, you can define an *instructionPrefix*, if you have a particular consistent way of writing these actions. 
    
    When Inky sees this, it will highlight the line of text both in the editor and player views, so that you can clearly see that it's not part of the game text itself.


## Implementation details

Inky is built using:

* [Electron](http://electron.atom.io/), a framework by GitHub to build cross-platform Desktop app using HTML, CSS and JavaScript.
* [Ace](https://ace.c9.io/#nav=about), a full-featured code editor built for the web.
* [Photon](http://photonkit.com/), for some of the components. However, the dependency could probably be removed, since its only used for small portions of the CSS.

Inky includes a copy of **inklecate**, the command line **ink** compiler.

## Help develop Inky!

Take a look at the [issues page](https://github.com/inkle/inky/issues) for an issue with a "help wanted" label. We try to provide some basic instructions on how to get started with the development of the feature whenever we add the label.

To build the project:

* Install [node.js](https://nodejs.org/en/) if you don't already have it
* Clone the repo
* On Mac, double-click the `INSTALL_AND_RUN.command` script. On Windows, open Powershell, cd into the app directory, and type `npm install`, then `npm start`.
* For subsequent runs, if no npm packages have changed, you can run the `RUN.command` script on Mac, or type `npm start` in the shell (on Windows).

### Linux

Tested on a fresh **Ubuntu 16.04 LTS** VM installation (_equivalent processes should work for other distributions_)

* Install build tools

`sudo apt-get install -y dkms build-essential linux-headers-generic linux-headers-$(uname -r)`

* Pre-requisites

`sudo apt install git`

`sudo apt install curl`

* Install node and npm

`curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`

`sudo apt-get install -y nodejs`

* Install mono as per http://www.mono-project.com/download/stable/#download-lin

`sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF`

`echo "deb http://download.mono-project.com/repo/ubuntu stable-xenial main" | sudo tee /etc/apt/sources.list.d/mono-official-stable.list`

`sudo apt-get update`

`sudo apt-get install mono-complete`

* Clone the inky repo

`git clone https://github.com/inkle/inky.git`

* Test inklecate_win with mono (_should output usage info_)

`mono app/main-process/ink/inklecate_win.exe`

* Install and run inky

`./INSTALL_AND_RUN.command`

* For subsequent runs, if no npm packages have changed, launch inky as below (otherwise re-run previous step):

`./RUN.command`

### Translation

Translation files are located under `app/main-process/i18n/`.  
If a particular locale file is missing (or if it's missing some keys), you can generate it with the following command: `cd app && npm run generate-locale -- <locale> ./main-process/i18n/`.

## License

**Inky** and **ink** are released under the MIT license. Although we don't require attribution, we'd love to know if you decide to use **ink** a project! Let us know on [Twitter](http://www.twitter.com/inkleStudios) or [by email](mailto:info@inklestudios.com).

### The MIT License (MIT)
Copyright (c) 2016 inkle Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

-

*Inky is named after a black cat based in Cambridge, UK.*
