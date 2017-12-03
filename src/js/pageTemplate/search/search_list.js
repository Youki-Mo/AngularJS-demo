app.directive('appSearchList',function(){
    return {
        restrict:'EA',
        replace:true,
        scope:true,
        templateUrl:'view/pageTemplate/search/search_list.html',
        link:function($scope){
        }
    }
});