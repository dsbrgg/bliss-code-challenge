/*
    Mock API service to manage all the API calls using $resource and $http
*/
blissApp.service('blissAPI', [ '$resource', '$http', function($resource, $http) {
    var self = this;
    
    let api;
    let url = 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com';
    
    // SERVER HEALTH CALL
    self.ServerHealth = function() {
        api = $resource(url+'/health', {});
        return api.get();
    };
    
    // GET QUESTIONS LIST
    self.ListQuestions = function(offset, filter) {
        api = $resource(url+'/:questions', { questions : 'questions' });
        return api.query({ limit : 10, offset, filter });
    };
    
    // GET QUESTION DETAIL
    self.QuestionDetails = function(id) {
       api = $http.get(url+`/questions/${id}`);
        
        return api.then(function(response) {
            return Promise.resolve(response); 
        }).catch(function(err) {
            return Promise.reject(err);
        });
    };
    
    // UPVOTE QUESTION CHOICE
     self.UpvoteChoice = function(id) {
       api = $http.put(url+`/questions/${id}`);
        
        return api.then(function(response) {
            return Promise.resolve(response); 
        }).catch(function(err) {
            return Promise.reject(err);
        });
    };
    
    // SHARE URL CONTENT
    self.Share = function(destination_email, content_url) {
        api = $http.post(url+`/share?${destination_email}&${content_url}`);
        
        return api.then(function(response) {
            return Promise.resolve(response); 
        }).catch(function(err) {
            return Promise.reject(err);
        });
        
    };
}]);

// Share service for better manipulation and interoperability between controllers
blissApp.service('shareService', [ function() {
    var self = this;
    self.obj = null;
}]);

// Detail service for better manipulation and interoperability between controllers
blissApp.service('detailService', [ function() {
    var self = this;
    self.obj = null;
}]);

