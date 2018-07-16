'use strict';

var app = angular.module('myApp',['ngRoute']);

app.config(["$routeProvider",'$locationProvider', function ($routeProvider,$locationProvider) {
	$routeProvider.when('/', {
		templateUrl :'/html/registration.html',
		controller:'controller'
	}) 
	.when('/home', {
		templateUrl :'/html/home.html',
		controller:'homeController'
	}).when('/profile', {
		templateUrl :'/html/profile.html',
		controller:'homeController'
	})
	$locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
}]);

app.factory('socket', function ($rootScope) {
  var socket = io.connect('http://localhost:9998');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});
 


app.factory('commonFactory', function(){
	// var factory = {};
	
	// factory.setProfileData = function(obj){
	// 	this.setProfileData = obj
	// };
	// factory.getProfileData = function(){
	// 	alert(this.setProfileData)
	// 	return this.setProfileData;
	// }
	var profileData = {};
	return {
		setProfileData:function(obj){
			profileData = obj;
		},
		getProfileData: function(){
			return profileData;
		}
	};
})



