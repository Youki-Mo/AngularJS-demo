app.controller('mainCtrl',['$scope','$http',function($scope,$http){
    $http({method:'get',url:'/data/class.json'}).then(function(rep){
        $scope.class = rep.data;
    });
    $http({method:'get',url:'/data/banner.json'}).then(function(rep){
        $scope.banner = rep.data;
    });
    $http({method:'get',url:'/data/course.json'}).then(function(rep){
        $scope.course = rep.data;
    });
    $scope.info=[
        {title:'实战推荐',icon:'title1',row:1,banner:false,sort:'coding'},
        {title:'新上好课',icon:'title2',row:2,banner:false,sort:'new'},
        {title:'新手入门',icon:'title3',row:2,banner:true,sort:'level'},
        {title:'技术提升',icon:'title4',row:2,banner:true,sort:'lv'},
        {title:'前沿技术',icon:'title5',row:2,banner:true,sort:'coding'}
    ];
}]);