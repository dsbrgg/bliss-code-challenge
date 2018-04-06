/*
    Controller for the server health status
*/

blissApp.controller('statusController', ['$scope', '$location', 'blissAPI', function($scope, $location, blissAPI) {
    // Check if health check was already done
    if($scope.status === 'OK') {
        console.log('teste')
        $location.path('/questions');
    }
    
    let currentHealth = blissAPI.ServerHealth();
    
    // Call API and respond accordingly
    currentHealth.$promise.then(function(health) {
        if(health.status === 'OK') {
            $scope.status = health.status;
            $location.path('/questions');
        } else {
            alert(health.status);
        }
    }).catch(function(err) {
       alert('Unable to get server status : ', err); 
    });
}]);


/*
    Controller for the question list
*/
blissApp.controller('questionsController', ['$scope', '$location', '$route', 'blissAPI', 'shareService', 'detailService', '$cookies', function($scope, $location, $route, blissAPI, shareService, detailService, $cookies) {
    // Gett query string to check if URL is being used for filtering
    const search = $location.search();
    const questionFilter = search.question_filter;
    
    // Get last page offset & querystring if any
    var offset = parseInt($cookies.get('offset'));
    var queryString = typeof questionFilter === 'string' ? questionFilter : '';
    
    // Backwards pagination
    $scope.previousPage = function() { 
        offset = $cookies.put('offset', offset-5);
        $route.reload();
    };
    
    // Forward pagination
    $scope.nextPage = function() { 
        offset = $cookies.put('offset', offset+5); 
        $route.reload();
    };
    
    // Send filter from input/querystring
    $scope.submit = function() { 
        queryString = $scope.filter; 
        $location.path('/questions').search('question_filter', queryString);
    };
    
    // Redirect to share screen with current object
    $scope.shareRedirect = function(obj) {
        shareService.obj = obj;
        $location.path('/share');
    };
    
    // Redirect to detail screen with current object
    $scope.detailRedirect = function(obj) {
        detailService.obj = obj;
        $location.path(`/questions/${obj.id}`);
    };
    
    // API call for the question list
    var listRequest = function() {
        var list = blissAPI.ListQuestions(offset, queryString);
        list.$promise.then(function(response) {
            let filteredArray = response.filter(function(f){ return typeof f === 'object'; });
            $scope.responseQuestions = filteredArray;
        }).catch(function(err) {
            alert(err);
        });
    };
    
    listRequest();
}]);

/*
    Controller for the question details screen
*/
blissApp.controller('detailsController', ['$scope', '$route', '$location', 'blissAPI', 'detailService', 'shareService', function($scope, $route, $location, blissAPI, detailService, shareService) {
    // Get query strings to check filtering
    const fullPath = $location.path().split('/');
    const questionId = fullPath[fullPath.length-1];
    
    // API call for upvoting a single choice
    $scope.upvotes = function(id) {
        id = id.split(':')[1];
        blissAPI.UpvoteChoice(id).then(function(response) {
            if(response.status === 201) {
                alert('Thanks for sharing your opinion!');
                $route.reload();
            }
        }).catch(function(err) {
            alert(`Sorry, there was an error in the request. Try again later. `, err);
        });
    };
    
    // Set question to $scope & go to Share Screen
    $scope.shareQuestion = function() {
        $scope.obj = shareService.obj;
        $location.path('/share');
    }
    
    // API call to get a single question detail
    var detailRequest = blissAPI.QuestionDetails(questionId);
    
    detailRequest.then(function(response) {
        $scope.obj = response.data;
        shareService.obj = response.data;
    }).catch(function(err) {
        alert('Sorry, your request could not be made. Try again later. ', err);
    });
}]);

/*
    Controller for the share screen
*/
blissApp.controller('shareController', ['$scope', '$location', 'blissAPI', 'shareService', function($scope, $location, blissAPI, shareService) {
    // Set scope obj for better manipulating on the directives
    $scope.obj = shareService.obj;
    
    // API call for the share functionality, responding accordingly.
    $scope.request = function() {
        let post = blissAPI.Share();
    
        post.then(function(response) {
            if(response.data.status === 'OK') {
                alert('Question shared successfully!');
                $location.path('/questions');
            }
        }).catch(function(err) {
            alert('Sorry, your request could not be made. Try again later. ', err);
        });
    }
    
}]);