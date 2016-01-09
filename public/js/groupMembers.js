var member = angular.module('groupMembers',[])

member.controller('groupmember', function($scope, $http){
    var ownerId = localStorage.getItem('_id');
    $scope.localItem = localStorage.getItem('_name');
    $scope.getMembers = function(){
        $scope.members = {};
        var gid = localStorage.getItem('_gid');
        $http({
            method: "GET",
            url: "http://localhost:8000/group/member/"+gid


        }).success(function (data, status, headers, config) {

            $scope.members =data;
            console.log($scope.members);



        })
            .error(function (data, status, headers, config) {
                alert(data);
            });
    }

    $scope.deleteMember = function(uid, gid){

        $http({
            method: "GET",
            url: "http://localhost:8000/group/check/",
            params: {
                uid:uid,
                gid:gid
            }


        }).success(function (data, status, headers, config) {
            var count = data[0].count;
            console.log(count);
            if(count >  0) {
                alert("Owner of the group cannot be expelled.\n You can delete the group.");

            }else{
                $http({
                    method: "GET",
                    url: "http://localhost:8000/group/check/",
                    params: {
                        uid:ownerId,
                        gid:gid
                    }


                }).success(function (data, status, headers, config) {
                    var count = data[0].count;
                    console.log(count);
                    if(count >  0) {
                        $http({
                            method: "GET",
                            url: "http://localhost:8000/group/member/",
                            params:{
                                uid:uid,
                                gid:gid
                            }


                        }).success(function (data, status, headers, config) {
                            if(data.affectedRows == 1) {
                                $scope.getMembers();
                                alert("Member Expelled");

                            }else{
                                alert("Error!");
                            }


                        })
                            .error(function (data, status, headers, config) {
                                alert(data);
                            });


                    }else{

                        alert("You have to be  owner of the group to expel members");
                    }


                })
                    .error(function (data, status, headers, config) {
                        alert(data);
                    });

            }


        })
            .error(function (data, status, headers, config) {
                alert(data);
            });
    }


});