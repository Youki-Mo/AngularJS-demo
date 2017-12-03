app.directive('appCr',function(){
    return {
        restrict:'EA',
        replace:true,
        scope:{
            data:'=scopeData'
        },
        templateUrl:'view/pageTemplate/course_list/codingRecommend.html',
        link:function($scope){
            $scope.over = function(index){
                var oLi = document.querySelectorAll('.coding_rmd li');
                for(var i = oLi.length-1;i>=0;i--){
                    oLi[i].removeAttribute('class');
                }
                oLi[index].setAttribute('class','active');
            };
        }
    }
});