app.directive('appCatalog',['$timeout',function($timeout){
    return {
        restrict:'EA',
        replace:true,
        scope:true,
        templateUrl:'/view/pageTemplate/main/catalog.html',
        link:function($scope){
            $scope.timer = $timeout(function(){
                Carousel('#classNav .rotation',{
                    container:'#classNav .rotation .content',
                    box:'#classNav .rotation .box',
                    prev:'#classNav .rotation .prev',
                    next:'#classNav .rotation .next',
                    active:'.active',
                    pager:true,
                    pagerNum:false,
                    starTime:3000,
                    Append:function(i){
                        var bg = document.querySelector('#classNav .bg');
                        if(bg != null){
                            bg.style.transition = 'background '+this.slideTime+'ms';
                            bg.style.background = document.querySelectorAll('#classNav .rotation .box i')[i].style.backgroundImage;
                        }
                    }
                });
                $timeout.cancel($scope.timer);
            },20);
        }
    }
}]);