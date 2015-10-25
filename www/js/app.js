// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'App.Controllers'])
  .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");
        // Now set up the states
        $stateProvider

            .state('app', {
                url: "/app",
                template: '<ion-nav-view></ion-nav-view>',
                abstract: true,
                resolve: {
                    resolvedUser: function CheckForAuthenticatedUser(ParseHttpService, $state) {
                        return ParseHttpService.getCurrentUser().then(function (_user) {
                            // if resolved successfully return a user object that will set
                            // the variable `resolvedUser`
                            return _user;
                        }, function (_error) {
                            $state.go('login');
                        })
                    }
                }
            })

            .state('app.home', {
                url: "/home",
                templateUrl: "templates/home.html",
                controller: "homeCtrl",
                resolve: {
                    CurrentUser: function (resolvedUser) {
                        return resolvedUser;
                    }
                }
            })

            .state('upperclassmen', {
                url: "upperclassmen/:id",
                templateUrl: "templates/upperclassmen.html",
                controller: "upperclassmenCtrl"
            })

            .state('login', {
                url: "/login",
                templateUrl: "templates/login.html",
                controller: "loginCtrl",
            })

            .state('introtocompsci', {
                url: "/home/introtocompsci",
                templateUrl: "templates/introToComputerScience.html",
                controller: "introToComputerScienceCtrl",
            })

            .state('signup', {
                url: "/signup",
                templateUrl: "templates/signup.html",
                controller: "signupCtrl",
            });
    });

