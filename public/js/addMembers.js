var add = angular.module('addMember',[]);
window.onbeforeunload = function() {
    localStorage.removeItem('_id');
    return '';
};
add.controller('addController', function($scope, $http) {
    $scope.localItem = localStorage.getItem('_name');
    var gid = localStorage.getItem('_gid');
    $scope.getUsers = function(){
        $scope.otherMembers = {};
        $http({
            method: "GET",
            url: "http://localhost:8000/group/getmember/"+gid

        }).success(function (data, status, headers, config) {
            console.log(data);

            $scope.otherMembers = data;

        })
            .error(function (data, status, headers, config) {
                alert(data);
            });
    }

    $scope.add = function(id){
        $scope.otherMembers = {};
        $scope.otherMembers.uid = id;
        $scope.otherMembers.gid = gid;
        $http({
            method: "POST",
            url: "http://localhost:8000/group/member",
            data:$scope.otherMembers

        }).success(function (data, status, headers, config) {
            console.log(data);
            $scope.getUsers();
            $("#success-alert").show();
            $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
            });

        })
            .error(function (data, status, headers, config) {
                alert(data);
            });
    }

});