var request = angular.module('viewRequest',[]);

request.controller('viewController', function($scope, $http){
    $scope.localItem = localStorage.getItem('_name');
    var uid = localStorage.getItem('_id');
    $scope.friendData = {};
    $scope.getRequests = function(){



        $http({
            method: "GET",
            url: "http://localhost:8000/friends/request/"+uid

        }).success(function (data, status, headers, config) {
            console.log(data);
            if(data == 0){
                $("#none-alert").show();

            }
            $scope.friendData = data;

        })
            .error(function (data, status, headers, config) {
                alert(data);
            });


    }


    $scope.accept = function(user){
        $scope.accepted = {}
        $scope.accepted.uid = uid;
        $scope.accepted.fid = user;


        $http({
            method: "POST",
            url: "http://localhost:8000/friends/accept",
            data:$scope.accepted

        }).success(function (data, status, headers, config) {
            console.log(data);

            $scope.getRequests();
            $("#success-alert").show();
            $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
            });
        })
            .error(function (data, status, headers, config) {
                alert(data);
            });
    }

    $scope.reject = function(user){
        $scope.rejected = {}
        $scope.rejected.uid = uid;
        $scope.rejected.fid = user;
        $http({
            method: "POST",
            url: "http://localhost:8000/friends/reject",
            data:$scope.rejected

        }).success(function (data, status, headers, config) {
            console.log(data);
            $scope.getRequests();
            $("#danger-alert").show();
            $("#danger-alert").fadeTo(2000, 500).slideUp(500, function(){

            });
        })
            .error(function (data, status, headers, config) {
                alert(data);
            });
    }

});