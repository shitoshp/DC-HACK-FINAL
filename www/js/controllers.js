angular.module('App.Controllers', ['App.Services'])
	.controller('loginCtrl', function ($scope, $state, ParseHttpService, $timeout) {
	    console.log("In Login Controller");

	    $scope.credentials = {};

        $scope.goToSignupAction = function() {
        $state.go("signup");
    }

	    $scope.doLoginAction = function () {
	        ParseHttpService.login($scope.credentials).then(function (_user) {
	            $timeout(function () {
	            
	                var x = $state.go('app.home', {});
                    $scope.$emit('loggedIn', true);
	                console.log("user", _user);
	            }, 2);
	   }, function (_error) {
	            alert("Login Error " + (_error.message ? _error.message: _error.data.error));
	        });
	    }
	})
    .controller('signupCtrl', function ($scope, $state, ParseHttpService) {
    })
    .controller('indexCtrl', function ($scope, $state, ParseHttpService, $timeout) {


        $scope.loggedIn  = false;

        $scope.$on('loggedIn', function() {
            console.log("loggedIn");
                $scope.loggedIn  = true;
        });


        $scope.doLogoutAction = function doLogoutAction() {
            ParseHttpService.logout().then(function(_response){
                $timeout(function () {
                    $state.go('login', {});
                    $scope.loggedIn  = false;

                    console.log("logout: logout", _response);
                }, 2);
            })
        };
    })
    .controller('upperclassmenCtrl', function ($scope, $state, ParseHttpService) {


       $scope.itemDetails = '';

        $scope.stateInfo = $state.current;

        $scope.stateParamsInfo = $state.params;

        

        //$scope.stuffDetail = ParseHttpService.getStuffbyid($state.params._id)

        ParseHttpService.getObjectById($state.params.id).then(function abc(_iddata){
            console.log(_iddata);
            console.log('am i working??????????')
            $scope.itemDetails = _iddata;
        }, function (_error) {
            alert("Error". _error.message);
        });
    })
    .controller('profileCtrl', function(){

    })
	.controller('homeCtrl', function ($scope, $state, ParseHttpService) {
        $scope.stateInfo = $state.current;

        $scope.itemsList = {};


        $scope.inputItem = {
            value: "",
            name: "",
            room: ""
        };

        $scope.goToProfile = function() {
            $state.go('profile', {});
        };


        $scope.goTointrotocompsciState = function() {
            $state.go('introtocompsci', {});
        };

        populateList();

        $scope.deleteObject = function editObject(_objectId) {
            ParseHttpService.deleteObjectById(_objectId)
                .then(function itemSaved(_deletedObject) {
                    alert("Item Deleted " + _deletedObject.objectId);

                    return populateList();

                    populateList().then(function (_data) {
                        $scope.itemsList = _data;
                    });




                }, function errorDeleting(_error) {
                    alert("Error Deleting Object " + _objectId)
                });
        };



        $scope.addItem = function addItem() {

            // separate the values
            var data = $scope.inputItem.value.split(",");

            if (data.length === 2) {
                $scope.inputItem.name = data[0].trim();
                $scope.inputItem.room = data[1].trim();

                console.log(JSON.stringify($scope.inputItem));

                ParseHttpService.addObject($scope.inputItem)
                    .then(function itemSaved(_newItem) {
                        alert("Item Saved", _newItem.objectId);
                        $scope.inputItem = {};

                        return populateList();




                    }, function errorSaving(_error) {
                        $scope.inputItem = {};
                    });
            } else {
                alert("Invalid Input: " + $scope.inputItem.value);
                $scope.inputItem = {};
            }
        };

        $scope.editObject = function editObject(_object) {

            var data = null;
            var editedObject = {};
            var objectData = prompt("Enter the Edited Information", _object.name + ", " + _object.room);


            if (objectData != null) {
                // separate the values
                data = objectData.split(",");
            }

            if (objectData && (data.length === 2)) {

                // create object parameters to save
                editedObject.name = data[0].trim();
                editedObject.room = data[1].trim();
                editedObject.objectId = _object.objectId;

                console.log(JSON.stringify(editedObject));

                ParseHttpService.updateObject(editedObject)
                    .then(function itemUpdated(_updatedItem) {
                        alert("Item Updated " + _updatedItem.objectId);

                        return populateList();

                    }, function errorSaving(_error) {
                        alert("Error Editing Object " + _error)
                    });
            } else {
                if (objectData !== null) {
                    alert("Invalid Input: " + objectData);
                }
            }
        };

        function populateList() {
            return ParseHttpService.getStuff().then(function (_listData) {
                $scope.itemsList = _listData.results;
            });
        }

        ParseHttpService.login().then(function loginSuccess(_loggedIn) {
            alert(_loggedIn.username + " logged in");



            return ParseHttpService.getStuff();
        }).then(function getObjectSuccess(_ObjectData){
                $scope.itemsList = _ObjectData.results;


        }, function error(_error) {
            console.log(_error);
        });

    })
   
	.controller('lowerclassmanProfileCtrl', function($scope) {

	})
	   
	.controller('signUpPageCtrl', function($scope) {

	})
	   
	.controller('course-SpecificQuiryByFreshmanCtrl', function($scope) {

	})
	   
	.controller('shitoshCtrl', function($scope) {

	})
	   
	.controller('upperclassmenProfileCtrl', function($scope) {

	})
	   
	.controller('introToComputerScienceCtrl', function ($scope, $state, ParseHttpService) {
		$scope.itemsList = {};

        $scope.goToUpperclassmenProfile = function(_id) {
            $state.go("upperclassmen", {
                id: _id
            });
        };
		function populateList() {
            return ParseHttpService.getStuff().then(function (_listData) {
                $scope.itemsList = _listData.results;
            });
        }
		populateList();
	})

	
	 