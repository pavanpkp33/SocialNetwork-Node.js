/**
 * Created by Pkp on 10/17/2015.
 */
var group = angular.module('createGroup',[]);

group.controller('createGroup', function($scope, $http)
{
    $scope.localItem = localStorage.getItem('_name');
    $scope.create = function(data){
        var uid = localStorage.getItem('_id');
        $scope.group = {};
        $scope.group = data;
        $scope.group.ownerid = uid;
        $http({
            method: "POST",
            url: "http://localhost:8000/group/action",
            data:$scope.group

        }).success(function (data, status, headers, config) {
            console.log(data);
            $("#success-alert").show();
            $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
            $scope.group ="";
                //
            });
        })
            .error(function (data, status, headers, config) {
                alert("Could not create group");
            });
        $scope.group ={};
    }
});