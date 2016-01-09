var wall = angular.module('groupWall',[]);

wall.controller('groupController', function($scope, $http){
    $scope.localItem = localStorage.getItem('_name');
    $scope.getGroup = function(){
    $scope.groupData={};
        var gid = localStorage.getItem('_gid');

        $http({
            method: "GET",
            url: "http://localhost:8000/group/details/"+gid

        }).success(function (data, status, headers, config) {
            console.log(data);

            $scope.groupData = data;

        })
            .error(function (data, status, headers, config) {
                alert(data);
            });


    }


});

wall.controller('groupPost', function($scope, $http){
    $scope.status = {};
    var uid = localStorage.getItem('_id');
    $scope.postGroup = function(message,id){
    var d = new Date();
        $scope.status.message = message;
        $scope.status.gid = id;
        $scope.status.uid = uid;
        $scope.status.date = d.toLocaleString();
        if(message == null){
            alert("Post field cannot be blank");
        }else {
            $http({
                method: "POST",
                url: "http://localhost:8000/group/status",
                data: $scope.status

            }).success(function (data, status, headers, config) {
                console.log(data);
                $scope.status.message = "";
                $scope.getStatus();
            })
                .error(function (data, status, headers, config) {
                    alert(data);
                });
        }
    }

    $scope.getStatus = function(){
        var gid = localStorage.getItem('_gid');
        $scope.updatedStatus = {};
        $http({
            method: "GET",
            url: "http://localhost:8000/group/status/"+gid


        }).success(function (data, status, headers, config) {

            $scope.updatedStatus =data;
            console.log($scope.updatedStatus);



        })
            .error(function (data, status, headers, config) {
                alert(data);
            });

    }


});