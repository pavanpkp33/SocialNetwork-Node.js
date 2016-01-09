/**
 * Created by Pkp on 10/15/2015.
 */
var wall = angular.module('wallPage',[]);



wall.controller('wallController', function($scope, $http)
{
    $scope.localItem = localStorage.getItem('_name');
        $scope.data = {};

        $scope.loadData = function(){
            var userid = localStorage.getItem('_id');
            $http({
                method: "GET",
                url: "http://localhost:8000/profile/details/"+userid

            }).success(function (data, status, headers, config) {
                console.log(data);
                $scope.data = data;

            })
                .error(function (data, status, headers, config) {
                    alert(data);
                });

}

});



wall.controller('mainData', function($scope, $http)
{
    $scope.status = {};
    $scope.updatedStatus = {};
    var d = new Date();

    $scope.postStatus = function(status){
    $scope.status.uid = localStorage.getItem('_id');
    $scope.status.record_time = d.toLocaleString();
    $scope.status.message = status;
    console.log($scope.status);
        if(status == null){
            alert("Status field cannot be blank");
        }else {
            $http({
                method: "POST",
                url: "http://localhost:8000/profile/status",
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
      var uid = localStorage.getItem('_id');

        $http({
            method: "GET",
            url: "http://localhost:8000/profile/status/"+uid


        }).success(function (data, status, headers, config) {

            $scope.updatedStatus =data;
            console.log($scope.updatedStatus);



        })
            .error(function (data, status, headers, config) {
                alert(data);
            });

    }

        $scope.test = function(value){

            console.log(value);
            alert("clicked on "+ value);
        }
});