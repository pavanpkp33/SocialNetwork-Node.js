/**
 * Created by Pkp on 10/16/2015.
 */
var update = angular.module('updateProfile',[]);

update.controller('profileUpdater', function($scope, $http)
{
    $scope.profile = {};
    $scope.localItem = localStorage.getItem('_name');
    $scope.getData = function(){
        var userid = localStorage.getItem('_id');
        $http({
            method: "GET",
            url: "http://localhost:8000/profile/details/"+userid

        }).success(function (data, status, headers, config) {
            console.log(data);
            $scope.profile = data;
        })
            .error(function (data, status, headers, config) {
                alert(data);
            });

    }

    $scope.updateData = function(inputProfile){
        $scope.update ={};
        $scope.update.id = localStorage.getItem('_id');
        $scope.update.about = inputProfile.about;
        $scope.update.interest = inputProfile.interest;
        $scope.update.education = inputProfile.education;
        $scope.update.work = inputProfile.work;
        $scope.update.relationship = inputProfile.relationship;
        console.log($scope.profile);
        $http({
            method: "POST",
            url: "http://localhost:8000/index/actionUpdate",
            data:$scope.profile

        }).success(function (data, status, headers, config) {
            console.log(data);
            $("#success-alert").show();
            $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){

                //
            });
        })
            .error(function (data, status, headers, config) {
                alert("Could not update data");
            });

    }

});
