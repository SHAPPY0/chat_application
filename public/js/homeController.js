app.controller('homeController', function($scope, $http, socket, $location, commonFactory,$routeParams, $rootScope, $timeout){
   var userData = localStorage.getItem('LoggedIn')? JSON.parse(localStorage.getItem('LoggedIn')): null;
    $scope.loggedInUsre = userData.data;
    var currentUrl = $location.url();
    var userType = 1;
	if($scope.loggedInUsre.type== '1') userType = 2;
	else if($scope.loggedInUsre.type == '0') userType = 0; 

    function fetchUsers(){
        $http.get('/api/users/'+userType, $scope.newUser).then(function success(resp){
            $scope.usersData = resp.data; 
        },function errorCallback(err){
            $scope.regFail = err.data;
            $scope.failAlert = true;
        });
    }
    fetchUsers();

    $scope.viewProfile = function(userData){ 
        localStorage.setItem('viewProfileUser', JSON.stringify(userData));
        commonFactory.setProfileData(userData);
        //var _url = decodeURIComponent('/profile?id='+userData._id); 
        $location.path('/profile').search({id:userData._id})
    };

    if(currentUrl.indexOf('/profile?') != -1){
        $scope.viewUserData = localStorage.getItem('viewProfileUser')? JSON.parse(localStorage.getItem('viewProfileUser')):{};
      // $scope.viewUserData = commonFactory.getProfileData() || {};
       
    }

    $scope.nickx = function(){
		socket.emit('nickname', $scope.nickname, function(cb){
			if(cb){
				$scope.nickSet = true; 
			}else{
				$scope.nickError = true;
				$scope.nickErrorMsg = 'Username Already Taken';
			}
		});
	}
$scope.startChat = function(to){
    $scope.toSocket = to;
}
	$scope.chatFrom = function(toSocket){ 
		var time = new Date().getHours()+":"+new Date().getMinutes(); 
		var data={msg:$scope.msg, time:time}
		//toSocket.emit('send message', data);
		socket.emit('send message', data);
		console.log(data)
		$scope.msg = ''; 
		$scope.msgOwner = true;
	};
	socket.on('new message', function(data){
		var ul = document.getElementById("list");
	    var li = document.createElement("li");
	    var div = document.createElement("div");
	    	if($scope.msgOwner){
	    		div.appendChild(document.createTextNode("Me:")); 
		        var span = document.createElement("span");
		      	span.appendChild(document.createTextNode(data.time));
		    	div.appendChild(span)
		    	li.appendChild(div)
		    	li.appendChild(document.createTextNode(data.msg));
		    	li.setAttribute("class", "msgOwner") 
		    	ul.appendChild(li)
	    	}else{
	    		div.appendChild(document.createTextNode(data.user.name+":")); 
		      	var span = document.createElement("span");
		      	span.appendChild(document.createTextNode(data.time));
		    	div.appendChild(span)
		    	li.appendChild(div)
		    	li.appendChild(document.createTextNode(data.msg));
		    	li.setAttribute("class", "msgforSee")  
		    	ul.appendChild(li);
	    	}
	   		 
	    	$scope.msgOwner = false;
	    	$scope.isTyping = false;
	});
	// socket.on('username', function(data){ 
    //     $scope.onlineUsers = data;
    //     $scope.usersData.data.forEach(function(obj){
    //         $scope.onlineUsers.forEach(function(_o){
    //             if(obj.firstname == _o.name){
    //                 obj.id = _o.id
    //             }
    //         })

    //     })     
    // });
    $timeout(function(){
        socket.emit('getOnlineUsers',{}, function(cb){
            $scope.onlineUsers = cb;
            $scope.usersData.data.forEach(function(obj){
                $scope.onlineUsers.forEach(function(_o){
                    if(obj.firstname == _o.name){
                        obj.socket = _o.socket
                    }
                })
    
            }) 
        })
    },500);
    

	$scope.privateChat = function(to){
		$scope.to = to;
		$scope.privateChatOn = true;
	}
	$scope.msgTyping = function(){
		socket.emit('isTyping','')
		//$scope.isTyping =true;
	}
	socket.on('ss', function(d){
		$scope.isTyping = true;
		$scope.typ = d;
		// if(!$scope.msg){
		// 	$scope.isTyping = false;
		// }
	});

   
    
});