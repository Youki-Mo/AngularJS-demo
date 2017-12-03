app.controller('showCtrl',['$scope','$state','$http',function($scope,$state,$http){
    $scope.isPage = false;
    if($state.params.courseId!=null){
        $scope.isPage = true;
    }
    $scope.courseId = $state.params.courseId;
    $http({method:'get',url:'/data/course.json'}).then(function(rep){
        for(var i in rep.data){
            if(rep.data[i].courseId==$scope.courseId){
                $scope.course = rep.data[i]
            }
        }
    })
}])