var sjModule = angular.module('sj');
sjModule.directive('shortcutForm', function() {
    var linkFunction = function(scope, element, attributes) {
        scope.submitText = attributes['submitText'];
        scope.fieldsChanged = attributes['requireEdit'] === 'false';
        scope.method = attributes['method'];
    };

    return {
        restrict: "E",
        templateUrl: '/js/directives/ShortcutForm/shortcutForm.html',
        link: linkFunction,
        scope: {}
    };
});