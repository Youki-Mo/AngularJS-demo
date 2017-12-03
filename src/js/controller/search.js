app.controller('searchCtrl',['$scope','$state','$http',function($scope,$state,$http){
    $scope.keywords = $state.params.keywords;
    $scope.types = $state.params.types;
    $http({method:'get',url:'/data/course.json'}).then(function(rep){
        var reg = new RegExp($scope.keywords,'i');
        var list={},n=0;
        for(var i in rep.data){
            if(rep.data[i].courseBriefly.match(reg) || rep.data[i].courseName.match(reg)){
                if(rep.data[i].courseCategory != 2){
                    list[n] = rep.data[i];
                    n++;
                }
            }
        }
        $scope.searchList = list;
        $scope.isData = isData(list);
    });
    $http({method:'get',url:'/data/user.json'}).then(function(rep){
        $scope.teacher = rep.data;
    })
    function isData(obj){
        for(var i in obj){
            return false;
        }
        return true;
    }
}]);