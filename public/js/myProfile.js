var profile = angular.module('myProfile',[]);

profile.controller('profileData', function($scope, $http){
    $scope.localItem = localStorage.getItem('_name');
    $scope.profileData = {};
    $scope.friendData = {};
    $scope.getProfileData = function(){

        var uid = localStorage.getItem('_id');

            $http({
                method: "GET",
                url: "http://localhost:8000/profile/details/"+uid

            }).success(function (data, status, headers, config) {
                console.log(data);
                var edit = data.dob.split('T');

                $scope.profileData = data;
                $scope.profileData.dob = edit[0];

            })
                .error(function (data, status, headers, config) {
                    alert(data);
                });

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

});
