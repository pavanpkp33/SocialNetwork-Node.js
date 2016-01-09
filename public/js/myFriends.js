var friend = angular.module('myFriends',[]);

friend.controller('friend', function($scope, $http){
    $scope.localItem = localStorage.getItem('_name');

    $scope.friendData = {};
    $scope.getFriends = function(){

        var uid = localStorage.getItem('_id');

        $http({
            method: "GET",
            url: "http://localhost:8000/friends/action/"+uid

        }).success(function (data, status, headers, config) {
            console.log(data);

           $scope.friendData = data;

        })
            .error(function (data, status, headers, config) {
                alert(data);
            });


    }

    $scope.deleteFriend = function(id){

        var uid = localStorage.getItem('_id');
        $scope.rejected = {}
        $scope.rejected.uid = uid;
        $scope.rejected.fid = id;
        $http({
            method: "POST",
            url: "http://localhost:8000/friends/reject",
            data:$scope.rejected

        }).success(function (data, status, headers, config) {
            console.log(data);
            $scope.getFriends();
            $("#danger-alert").show();
            $("#danger-alert").fadeTo(2000, 500).slideUp(500, function(){

            });
        })
            .error(function (data, status, headers, config) {
                alert(data);
            });


    }

    $scope.visit = function(fid){

        localStorage.setItem('_fid', fid);
        window.location.href="/profile.html";
    }

});