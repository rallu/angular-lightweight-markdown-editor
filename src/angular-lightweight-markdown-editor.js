(function() {
    angular.module("angular-lightweight-markdown-editor", [
        "ngSanitize"
    ]).directive("markdownEditor", angularMarkdownEditor);

    var textareaElement;
    var translationTexts = {
        "textPreview": "Preview",
        "textProvideText": "Please provide link text",
        "textProvideLink": "Please provide link URL"
    };

    if (typeof showdown !== "undefined") {
        var mdConverter = new showdown.Converter();
    }

    function angularMarkdownEditor() {
        return {
            restrict: "E",
            templateUrl: "angular-lightweight-markdown-template.html",
            controller: markdownController,
            controllerAs: "markdownEditorCtrl",
            scope: true,
            bindToController: {
                ngModel: "=",
                textPreview: "@",
                textProvideText: "@",
                textProvideLink: "@",
                showPreview: "="
            },
            require: ['^form', 'ngModel'],
            link: function(scope, element, attrs, ctrls) {
                textareaElement = element.find("textarea")[0];
                var form = ctrls[0];
                var copyAttrToTextarea = [
                    "name", "required", "minLength", "maxLength", "placeholder", "selectionDirection", "selectionStart", "selectionEnd", "spellcheck"
                ];
                angular.forEach(copyAttrToTextarea, function(param) {
                    if (attrs[param]) {
                        textareaElement[param] = attrs[param];
                    }
                });
            }
        }
    }

    function markdownController($sce) {
        this.preview = false;

		if(typeof this.showPreview !== "undefined") {
        	this.preview = this.showPreview;
        }

        this.showdownEnabled = (typeof showdown !== "undefined");

        for (var key in translationTexts) {
            if (angular.isDefined(this[key])) {
                translationTexts[key] = this[key];
            }
        }
        this.translations = translationTexts;

        this.action = function(name) {
            var result = actions[name](this.ngModel, getSelectionInfo());
            if (result !== false) {
                this.ngModel = result;
            }
        };

        this.getHTML = function() {
            if (!this.showdownEnabled) {
                return "";
            }
            return $sce.trustAsHtml(mdConverter.makeHtml(this.ngModel));
        };
    }

    function getSelectionInfo() {
        return {
            start: textareaElement.selectionStart,
            end: textareaElement.selectionEnd,
            length: textareaElement.selectionEnd - textareaElement.selectionStart
        };
    }

    var actions = {
        bold: function(model, selection) {
            if (selection.length == 0) {
                return model;
            }

            return helpers.surround(model, selection.start, selection.end - selection.start, "**", "**");
        },
        italic: function(model, selection) {
            if (selection.length == 0) {
                return model;
            }

            return helpers.surround(model, selection.start, selection.end - selection.start, "*", "*");
        },
        bullets: function(model, selection) {
            return helpers.startLinesWith(model, selection.start, selection.end, "* ");
        },
        heading: function(model, selection) {
            return helpers.startLinesWith(model, selection.start, selection.end, "#");
        },
        strikethrough: function(model, selection) {
            if (selection.length == 0) {
                return model;
            }

            return helpers.surround(model, selection.start, selection.end - selection.start, "--", "--");
        },
        indent: function(model, selection) {
            return helpers.startLinesWith(model, selection.start, selection.end, "\t");
        },
        quote: function(model, selection) {
            return helpers.startLinesWith(model, selection.start, selection.end, "> ");
        },
        code: function(model, selection) {
            if (selection.length == 0) {
                return model;
            }

            var startpos = model.substr(0, selection.start).lastIndexOf("\n") + 1;
            var nextNewLine = model.substr(selection.end).indexOf("\n");
            if (nextNewLine == -1) {
                var endpos = model.length;
            } else {
                var endpos = selection.end + nextNewLine + 1;
            }
            return [
                model.substr(0, startpos),
                "```\n",
                model.substr(startpos, endpos - startpos),
                "\n```\n",
                model.substr(endpos)
            ].join("");
        },
        link: function(model, selection) {
            if (selection.length > 0) {
                var text = model.substr(selection.start, selection.length);
            } else {
                var text = prompt(translationTexts["textProvideText"]);
                if (!text) {
                    return false;
                }
            }
            var link = prompt(translationTexts["textProvideLink"]);
            if (!link) {
                return false;
            }

            return [
                model.substr(0, selection.start),
                "[" + text + "]",
                "(" + link + ")",
                model.substr(selection.end)
            ].join("");
        }
    };


    var helpers = {
        surround: function(text, start, length, before, after) {
            var between = text.substr(start, length);
            return [
                text.substr(0, start),
                (before ? before : ""),
                between,
                (after ? after : ""),
                text.substr(start + length)
            ].join("");
        },
        startLinesWith: function(text, start, end, startWith) {
            var lineStartPositions = helpers.indexes(text.substr(start, end - start), "\n", start);
            var firstpos = text.substr(0, start).lastIndexOf("\n") + 1;
            text = [text.substr(0, firstpos), startWith, text.substr(firstpos)].join("");
            for (var i = 0; i < lineStartPositions.length; i++) {
                text = [
                    text.substr(0, startWith.length * (i+1) + lineStartPositions[i] + 1),
                    startWith,
                    text.substr(startWith.length * (i+1) + lineStartPositions[i] + 1)
                ].join("");
            }
            return text;
        },
        indexes: function(source, find, add) {
            var result = [];
            for (i = 0; i < source.length; ++i) {
                if (source.substring(i, i + find.length) == find) {
                    result.push(i + add);
                }
            }
            return result;
        }
    };
})();
