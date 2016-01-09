/**
 * Created by Pkp on 10/17/2015.
 */
var group = angular.module('myGroup',[]);

group.controller('mygroupController', function($scope, $http){
    $scope.localItem = localStorage.getItem('_name');
    $scope.groups ={};

    $scope.myGroups = function(){

        var uid = localStorage.getItem('_id');
        $http({
            method: "GET",
            url: "http://localhost:8000/group/action/"+uid


        }).success(function (data, status, headers, config) {
            if(data.length >0) {
              $scope.groups = data;
            }else{
                //Display red alert
            }


        })
            .error(function (data, status, headers, config) {
                alert(data);
            });

    }
    $scope.route = function(id){
        localStorage.setItem('_gid',id);
        window.location.href="/groupWall.html";

    }

    $scope.deleteGroup = function(id){
        var uid = localStorage.getItem('_id');
        $http({
            method: "GET",
            url: "http://localhost:8000/group/check/",
            params: {
                uid:uid,
                gid:id
            }


        }).success(function (data, status, headers, config) {
            var count = data[0].count;
            console.log(count);
            if(count >  0) {
                $http({
                    method: "GET",
                    url: "http://localhost:8000/group/page/"+id


                }).success(function (data, status, headers, config) {
                    if(data.affectedRows == 1) {
                        $scope.myGroups();
                        alert("Group deleted.");

                    }else{
                        //Display red alert
                    }


                })
                    .error(function (data, status, headers, config) {
                        alert(data);
                    });

            }else{
                alert("You are not the owner.")
            }


        })
            .error(function (data, status, headers, config) {
                alert(data);
            });



    }



});

group.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }]);
