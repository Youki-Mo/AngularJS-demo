app.directive('basePager',function(){
    return {
        restrict:'EA',
        replace:true,
        scope:{
            router:'@scopeRouter',
            page:'=scopePage',
            list:'=scopeList'
        },
        templateUrl:'/view/baseTemplate/pager.html',
        link:function($scope){
            $scope.prev = function(page){
                if(page-1>=0){
                    return page-1;
                }
                return 0;
            }
            $scope.next = function(page,pageTotal){
                if(page+1<=pageTotal){
                    return page+1;
                }
                return page;
            }
            $scope.isPage = function(page,index){
                if(page==index){
                    return true;
                }
                return false;
            }
        }
    }
})