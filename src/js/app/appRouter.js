app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider.state('main',{   //首页
        url:'/main',
        templateUrl:'view/main.html',
        controller:'mainCtrl',
        resolve:{
            loadMyCarousel:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load(['/plugin/carousel.js']);
            }]
        }
    }).state('search',{ //搜索
        url:'/search?keywords&types',
        templateUrl:'view/search.html',
        controller:'searchCtrl'
    }).state('course_list',{    //课程
        url:'/course_list?classId&courseLv&sort&page',
        templateUrl:'view/course_list.html',
        controller:'listCtrl'
    }).state('course_show',{    //课程详情
        url:'/course_show?courseId',
        templateUrl:'view/course_show.html',
        controller:'showCtrl'
    });
    $urlRouterProvider.otherwise('main');
}])