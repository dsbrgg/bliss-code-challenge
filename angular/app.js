// Modules
var blissApp = angular.module('blissApp', [ 'ngRoute', 'ngResource', 'ngCookies' ]);

blissApp.run(function($window, $rootScope, $cookies, $location) {
    $cookies.put('offset', 0);
    
    // Set events to check for internet connection constantly
    $rootScope.online = navigator.onLine;
        $window.addEventListener("offline", function() {
            $rootScope.$apply(function() {
                $rootScope.online = false;
                $cookies.put('lastState', $location.absUrl());
                
                alert('There\'s seems to be a problem in the connection. Don\'t worry, we\'ve managed to save your progress when everything gets normal again.');
                $location.path('/noConnection');
            });
        }, false);

    $window.addEventListener("online", function() {
        $rootScope.$apply(function() {
            // Check if connection had been lost, if so, load latest stage
            var cookie = $cookies.get('lastState');
            $rootScope.online = true;
            
            if(cookie) { $location.path(cookie); }
        });
    }, false);
});
