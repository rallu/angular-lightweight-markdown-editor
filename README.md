Angular markdown editor
=======================

angular-markdown-editor is extremely light weight editor for markdown.
It doesn't use any fancy text editors but just that basic textarea. It has few
buttons for newbie markdown users to edit text easily. This means you can add
it to your project without fear of huge transfer sizes.

Editor displays preview if showdown.js is included in to the project.

## Parameters

| Parameter | Description | Default |
| --------- |:-----------:|:--------|
| ng-model  | Data model to use in textarea | |
| text-preview | Button text for preview | Preview |
| text-propose-text | Prompt text to as link text | Please provide link text |
| text-propose-link | Prompt text asking for link url | Please provide link URL |

## Usage

Install using bower

> bower install angular-markdown-editor

Include CSS and JS to project

> <link  href="angular-markdown-editor/dist/angular-markdown-editor.css" rel="stylesheet">
> <script src="angular-markdown-editor/dist/angular-markdown-editor.min.js"></script>

[See demo for example code](demo/index.html)
