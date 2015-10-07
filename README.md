Angular markdown editor
=======================

angular-lightweight-markdown-editor is extremely light weight editor for markdown.
It doesn't use any fancy text editors but just that basic textarea. It has few
buttons for newbie markdown users to edit text easily. This means you can add
it to your project without fear of huge transfer sizes.

Editor displays preview if showdown.js is included in to the project.

## Usage

Install using bower

> bower install angular-lightweight-markdown-editor

Include CSS and JS to project

> <link  href="angular-lightweight-markdown-editor/dist/angular-lightweight-markdown-editor.css" rel="stylesheet">
> <script src="angular-lightweight-markdown-editor/dist/angular-lightweight-markdown-editor.min.js"></script>

Add dependecy to your angular application

```
angular.module("myapp", [
    "angular-lightweight-markdown-editor"
]);
```

Include editor into your html

```
<angular-lightweight-markdown-editor></angular-lightweight-markdown-editor>
```

[See demo for example code](demo/index.html)

## Parameters

| Parameter | Description | Default |
| --------- |:-----------:|:--------|
| ng-model  | Data model to use in textarea | |
| text-preview | Button text for preview | Preview |
| text-propose-text | Prompt text to as link text | Please provide link text |
| text-propose-link | Prompt text asking for link url | Please provide link URL |
