app.controller('listCtrl',['$scope','$state','$http','page','getClass','getCourse',function($scope,$state,$http,page,getClass,getCourse){
    $scope.classId = $state.params.classId==undefined?undefined:parseInt($state.params.classId);
    $scope.courseLv = $state.params.courseLv==undefined?undefined:parseInt($state.params.courseLv);
    $scope.sort = $state.params.sort;
    $scope.page = $state.params.page==null?0:parseInt($state.params.page);
    $http({method:'get',url:'/data/course.json'}).then(function(rep){
        var data = function(){
            var d=[];
            if($scope.classId==null){
                var list=[],num=0;
                for(var i in rep.data){
                    if(rep.data[i].courseCategory!=2){
                        if(rep.data[i].courseId!=7&&rep.data[i].courseId!=8){
                            list[num]=rep.data[i];
                            num++;
                        }
                    }
                }
                d=list;
            }else{
                if(getClass.getLv($scope.classId)==0){
                    var classObj = getClass.getChild($scope.classId);
                    d=getCourse.getIdObj(classObj);
                }else{
                    d=getCourse.getId($scope.classId);
                }
            }
            return getCourse.getCourseLv($scope.courseLv,d);
        }();
        $scope.list = page.page(data,12,$scope.page);
    });
    $http({method:'get',url:'/data/class.json'}).then(function(rep){
        $scope.class = rep.data;
        //获取一级菜单数据
        $scope.oneClass = function(){
            var obj=[],num=0;
            for(var i in rep.data){
                if(rep.data[i].classLv==0){
                    if(rep.data[i].classId!=7&&rep.data[i].classId!=8){
                        obj[num] = rep.data[i];
                        num++;
                    }
                }
            }
            return obj;
        }();
        //获取三级菜单数据
        $scope.threeClass = function(){
            var obj=[],num=0;
            for(var i in rep.data){
                if(rep.data[i].classLv==2){
                    var parentId = getClass.getParent(rep.data[i].classId,rep.data).classId;
                    if(parentId!=7&&parentId!=8){
                        obj[num] = rep.data[i];
                        num++
                    }
                }
            }
            return obj;
        }()
    });
}]) 