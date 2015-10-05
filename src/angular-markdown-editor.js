(function() {
    angular.module("angular-markdown-editor", [
        "ngSanitize"
    ]).directive("markdownEditor", angularMarkdownEditor);

    var textareaElement;
    var mdConverter = new showdown.Converter();

    function angularMarkdownEditor() {
        return {
            restrict: "E",
            templateUrl: "../src/angular-markdown-template.html",
            controller: markdownController,
            controllerAs: "markdownEditorCtrl",
            scope: true,
            bindToController: {
                ngModel: "="
            },
            link: function(scope, element) {
                textareaElement = element.find("textarea")[0];
            }
        }
    }

    function markdownController($sce) {
        this.action = function(name) {
            this.ngModel = actions[name](this.ngModel, getSelectionInfo());
        };

        this.getHTML = function() {
            return $sce.trustAsHtml(mdConverter.makeHtml(this.ngModel));
        };
    }

    function getSelectionInfo() {
        return {
            start: textareaElement.selectionStart,
            end: textareaElement.selectionEnd
        };
    }

    var actions = {
        bold: function(model, selection) {
            return helpers.surraund(model, selection.start, selection.end - selection.start, "**", "**");
        },
        underline: function(model, selection) {
            return helpers.surraund(model, selection.start, selection.end - selection.start, "__", "__");
        },
        bullets: function(model, selection) {
            return helpers.startLinesWith(model, selection.start, selection.end, "* ");
        }
    };


    var helpers = {
        surraund: function(text, start, length, before, after) {
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
