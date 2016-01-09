var login = angular.module('loginApp',[]);

login.controller('loginController', function($scope, $http)
     { 
		$scope.credentials = {};
		var popFailmessage = function(){
			 $("#danger-alert").show();
                $("#danger-alert").fadeTo(2000, 500).slideUp(500, function(){

                }); 
		}
		 $scope.authenticate = function(user){
			 var credentials = user;// angular.copy(user);
		$http({
    method: "GET",
    url: "http://localhost:8000/index/action",
    params: {
        email : credentials.email,
		password : credentials.password
    }
	}).success(function (data, status, headers, config) { 
		console.log(data);
            if(data ==  0){
				
				popFailmessage();

			}else{

				localStorage.setItem('_id', data[0].id);
				localStorage.setItem('_name', data[0].firstname+" "+data[0].lastname);
				window.location.href="wall.html";
			}
        })
        .error(function (data, status, headers, config) { 
            alert(data);
        });
			
			
		}
	 
		
	 });
	 
login.controller("registerController", function($scope, $http){
	
	$scope.register = {};	
	var popMessage = function(){
		 $("#success-alert").show();
           $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){

		  // 
           }); 
	}
	$scope.registerUser = function(register){
		var params = register;
		console.log(params);
		$http({
			method : "POST",
		    url : 'http://localhost:8000/index/action' ,
		    
		    data: params
			}).success(function (data, status, headers, config) { 
				console.log(data);
				if(data.affectedRows == 1){
					
					popMessage();
					setTimeout(function(){location.reload();}, 2000);

					
				}else{
					alert("Registration failed.");
					location.reload();
				}
		          
		        })
		        .error(function (data, status, headers, config) { 
		            console.log(data);

				if(data.errno == 1062){
					alert("User ID already exists");
					location.reload();
				}else{
					alert("Registration failed.\n All fields are mandatory. ");
					location.reload();
				}
		        });
		
	}
	
	
});