app.controller('controller', function($scope, $http, socket, $location){
	$scope.registerUser = function(){
        if($scope.userRegForm.$valid){ 
		$http.post('/api/signup', $scope.newUser).then(function success(resp){
			$scope.regSuccess = resp.data;
			if($scope.regSuccess.status == 'S'){
				$scope.successAlert = true;  
			    $scope.newUser = {};
			}else{
				alert('Error is occured!!!')
			}
			
		},function errorCallback(err){
			$scope.regFail = err.data;
			$scope.failAlert = true;
        });
    }else{
        alert('Please fill required fields ')
    }
	} 

	$scope.loginUser = function(){
		if($scope.loginForm.$valid){
			$http.put('/api/login', $scope.login).then(function success(resp){
				$scope.userData = resp.data;
				if($scope.userData.status == 'S'){ 
					$scope.login = {};
					localStorage.setItem('LoggedIn', JSON.stringify($scope.userData));
					socket.emit('nickname', $scope.userData.data.firstname, function(cb){
						if(cb){
							$location.path('/home');
							$scope.nickSet = true; 
						}else{
							$scope.nickError = true;
							$scope.nickErrorMsg = 'Username Already Registers';
						}
					});
				} else{
					alert('Invalid Credentials.');
				}
				 
			},function errorCallback(err){
				$scope.regFail = err.data;
				$scope.failAlert = true;
			});
		}else{
			alert('Please enter email and password');
		}
	}

	socket.on('onlineUsers', function(users){ 
		$scope.onlineUserss = users;
	});

	$scope.sendhi = function(sId){
		var data = {sendto_id : sId, msg:'Hello'};
		socket.emit('sendHi', data)
	}
	socket.on('getMsg', function(data){
		$scope.sayHImsg = data;
	})
})