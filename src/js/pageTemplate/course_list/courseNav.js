app.directive('appCourseNav',['$state','getClass',function($state,getClass){
    return {
        restrict:'EA',
        replace:true,
        scope:true,
        templateUrl:'view/pageTemplate/course_list/courseNav.html',
        link:function($scope){
            $scope.isParam=function(paramName,paramValue){
                if(paramValue==null){
                    return undefined;
                }
                return paramName+'='+paramValue;
            }
            $scope.oneActive = function(data,classId,param){
                if(param==null||param=='true'){
                    return false;
                }
                if(classId==param){
                    return true;
                }
                if(data[param].classLv==2){
                    if(getClass.getParent(param).classId==classId){
                        return true;
                    }
                }
                return false;
            }
            $scope.three = function(data,param){
                if(typeof parseInt(param)!='number'||param==null){
                    return undefined;
                }
                for(var i in data){
                    if(data[i].classId==param&&data[i].classLv==2){
                        return 'classId='+getClass.getParent(param).classId;
                    }
                }
                return undefined;
            }
        }
    }
}]);