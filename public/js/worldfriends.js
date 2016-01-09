var world = angular.module('world',[]);

world.controller('worldController', function($scope, $http)
{

    $scope.data = {};
    $scope.localItem = localStorage.getItem('_name');
    $scope.getMembers = function(){
        var userid = localStorage.getItem('_id');
        $http({
            method: "GET",
            url: "http://localhost:8000/friends/action/",
            params : {
                uid : userid
            }

        }).success(function (data, status, headers, config) {
            console.log(data);
            $scope.data = data;

        })
            .error(function (data, status, headers, config) {
                alert(data);
            });

    }

    $scope.sendRequest = function(data){
        var uid = localStorage.getItem('_id');
        $scope.friend = {};
        $scope.friend.fid = data;
        $scope.friend.uid = uid;

        $http({
            method: "POST",
            url: "http://localhost:8000/friends/action",
            data:$scope.friend

        }).success(function (data, status, headers, config) {
            console.log(data);
            if(data.serverStatus == 2) {
                $scope.getMembers();
                $("#success-alert").show();
                $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {

                    //
                });
            }else{
                alert("Something Went wrong")
            }
        })
            .error(function (data, status, headers, config) {
                alert("Could not send request");
            });

    }

});
