Angular lightweight markdown editor
===================================

angular-lightweight-markdown-editor is extremely light weight editor (v0.0.3 12kb) for markdown. It doesn't use any fancy text editors but just that basic `textarea`. This means you can add it to your project without fear of huge transfer sizes.

Requires only angular.js and angular-sanitize.js libraries.

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
    "ngSanitize",
    "angular-lightweight-markdown-editor"
]);
```

Include editor into your html

```
<markdown-editor></markdown-editor>
```

[See demo for example code](demo/index.html)

## Parameters

| Parameter | Description | Default |
| --------- |:------------|:--------|
| ng-model  | Data model to use in textarea | |
| text-preview | Button text for preview | Preview |
| text-propose-text | Prompt text to as link text | Please provide link text |
| text-propose-link | Prompt text asking for link url | Please provide link URL |
| name | [Default textarea parameter](https://developer.mozilla.org/en/docs/Web/HTML/Element/textarea) | |
| required | [Default textarea parameter](https://developer.mozilla.org/en/docs/Web/HTML/Element/textarea) | |
| minlength  | [Default textarea parameter](https://developer.mozilla.org/en/docs/Web/HTML/Element/textarea) | |
| maxlength | [Default textarea parameter](https://developer.mozilla.org/en/docs/Web/HTML/Element/textarea) | |
| placeholder | [Default textarea parameter](https://developer.mozilla.org/en/docs/Web/HTML/Element/textarea) | |
| selectionDirection | [Default textarea parameter](https://developer.mozilla.org/en/docs/Web/HTML/Element/textarea) | |
| selectionStart | [Default textarea parameter](https://developer.mozilla.org/en/docs/Web/HTML/Element/textarea) | |
| selectionEnd | [Default textarea parameter](https://developer.mozilla.org/en/docs/Web/HTML/Element/textarea) | |
| spellcheck | [Default textarea parameter](https://developer.mozilla.org/en/docs/Web/HTML/Element/textarea) | |
