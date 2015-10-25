angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('login', {
      url: '/page1',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
        
    .state('lowerclassmanProfile', {
      url: '/page2',
      templateUrl: 'templates/lowerclassmanProfile.html',
      controller: 'lowerclassmanProfileCtrl'
    })
        
      
    
      
        
    .state('signUpPage', {
      url: '/page3',
      templateUrl: 'templates/signUpPage.html',
      controller: 'signUpPageCtrl'
    })
        
      
    
      
        
    .state('course-SpecificQuiryByFreshman', {
      url: '/page8',
      templateUrl: 'templates/course-SpecificQuiryByFreshman.html',
      controller: 'course-SpecificQuiryByFreshmanCtrl'
    })
        
      
    
      
        
    .state('shitosh', {
      url: '/page9',
      templateUrl: 'templates/shitosh.html',
      controller: 'shitoshCtrl'
    })
        
      
    
      
        
    .state('upperclassmenProfile', {
      url: '/page10',
      templateUrl: 'templates/upperclassmenProfile.html',
      controller: 'upperclassmenProfileCtrl'
    })
        
      
    
      
        
    .state('introToComputerScience', {
      url: '/page10',
      templateUrl: 'templates/introToComputerScience.html',
      controller: 'introToComputerScienceCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page1');

});