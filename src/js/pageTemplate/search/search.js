app.directive('appSearch',['$state',function($state){
    return {
        restrict:'EA',
        replace:true,
        scope:true,
        templateUrl:'view/pageTemplate/search/search.html',
        link:function($scope){
            function isParams(){
                if($scope.types!=null){
                    return $state.go('search',{keywords:$scope.keywords,types:$scope.types});
                }else{
                    return $state.go('search',{keywords:$scope.keywords});
                }
            }
            $scope.keyup = function(e){
                var keycode = window.event?e.keyCode:e.which;
                if(keycode==13 && $scope.keywords.length!=0){
                    isParams();
                }
            }
            $scope.search = function(){
                isParams();
            }
        }
    }
}]);