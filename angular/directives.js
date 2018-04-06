/*
    Question list directive
*/

blissApp.directive('questionList', function() {
    return {
        restrict : 'E',
        templateUrl : 'directives/questionList.htm',
        replace : false,
        scope : {
            item : "=",
            shareRedirect : "&",
            detailRedirect : "&"
        }
    } 
});