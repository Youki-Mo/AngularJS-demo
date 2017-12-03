app.directive('baseHead',['$timeout','$state',function($timeout,$state){
    return {
        restrict:'EA',
        replace:true,
        scope:{
            bg:"@scopeBg"
        },
        templateUrl:'view/baseTemplate/head.html',
        link:function($scope){
            $scope.txt = '';
            $scope.so = false;
            $scope.focus = function(){
                $scope.so=true;
            };
            $scope.blur = function(){
                $timeout(function(){
                    $scope.so=false;
                },120)
            };
            $scope.keyup = function(e){
                var keycode = window.event?e.keyCode:e.which;
                if(keycode==13 && $scope.txt.length!=0){
                    console.log($scope.txt);
                    $state.go('search',{keywords:$scope.txt});
                }
            }
            $scope.search = function(){
                /*var data = new Date(),day=1;
                data.setTime(data.getTime()+day*24*3600*1000);
                document.cookie= "history="+input.value+";path=/;expires=" + data.toGMTString();*/
            }
        }
    }
}]);