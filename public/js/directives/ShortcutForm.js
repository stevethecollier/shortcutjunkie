var sjModule = angular.module('sj');
sjModule.directive('shortcutForm', function() {
    var linkFunction = function(scope, element, attributes) {
        scope.submitText = attributes['submitText'];
        scope.fieldsChanged = attributes['requireEdit'] === 'false';
    };

    return {
        restrict: "E",
        templateUrl: '/partials/shortcutForm.html',
        link: linkFunction,
        scope: {}
    };
});