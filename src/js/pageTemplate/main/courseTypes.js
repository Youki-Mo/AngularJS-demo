app.directive('appCourseTypes',function(){
    return {
        restrict:'EA',
        replace:true,
        scope:{
            info:'=scopeInfo',
            data:'=scopeData',
            class:'=scopeClass'
        },
        templateUrl:'/view/pageTemplate/main/courseTypes.html',
        link:function($scope){
            var arr = $scope.info.title.split('');
            for(var i in arr){
                if(arr.length-1>i){
                    arr[i]+='<span>／</span>'
                }
            }
            $scope.title = arr.join('');
            $scope.sort = function(obj){
                console.log(obj.addTime);
                return new Date(obj.addTime);
            }
        }
    }
})