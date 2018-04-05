blissApp.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    
    $routeProvider
        .when('/', { // STATUS PAGE ROUTE
            templateUrl : 'pages/loadingScreen.htm',
            controller  : 'statusController'
        })
        .when('/questions', { // QUESTION LIST ROUTE
            templateUrl : 'pages/questionsScreen.htm',
            controller  : 'questionsController'
        })
        .when('/questions/:id', { // QUESTION'S DETAIL ROUTE
            templateUrl : 'pages/detailScreen.htm',
            controller  : 'detailsController'
        })
        .when('/share', { // SHARE SCREEN ROUTE
            templateUrl : 'pages/shareScreen.htm',
            controller : 'shareController'
        })
        .when('/connect', { // FAILURE ON THE INTERNET ROUTE
            templateUrl : 'pages/noConnectionScreen.htm'
        });
});