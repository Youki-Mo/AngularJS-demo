app.service('page',function(){
    /**
     * 简单分页
     * @param {object} data 表示需要分页的数据
     * @param {number} pageSize 表示每页显示数量
     * @param {number} pageIndex 表示当前页码
     */
    this.page = function(data,pageSize,pageIndex){
        pageIndex = pageIndex==null ? 0:parseInt(pageIndex);
        var first = pageSize*pageIndex,
            last = pageSize*(pageIndex+1),
            pageTotal = Math.ceil(data.length/pageSize),
            list = {num:0,pageTotal:pageTotal-1,pageNum:[],data:{}};
        for(var x = 0; x <= pageTotal-1;x++){
            list.pageNum[x] = x;
        }
        for(var i in data){
            if(i >= first && i < last){
                list.data[list.num] = data[i];
                list.num++;
            }
        }
        return list;
    }
})
app.service('getClass',['$http',function($http){
    var classData = {};
    $http({method:'get',url:'/data/class.json'}).then(function(rep){
        classData = rep.data;
    })


    /**
     * 查询当前课程类目编号属于几级菜单
     * @param {number} classId 课程类目编号
     */
    this.getLv = function(classId){
        for(var i in classData){
            if(classData[i].classId == classId){
                return classData[i].classLv;
            }
        }
    }


    /**
     * 找出三级菜单所属的一级菜单
     * @param {number} classId 表示需要找归属的课程类目编号
     */
    this.getParent = function(classId){
        if(classData[classId].classLv==2){
            for(var i in classData){
                if(classData[i].classId==classData[classId].parentId){
                    return classData[classData[i].parentId];
                }
            }
        }else{
            console.log('这不是三级菜单。');
        }
    }


    /**
     * 找出所属一级菜单的三级菜单
     * @param {number} classId 表示需要找归属的课程类目编号
     */
    this.getChild = function(classId){
        if(classData[classId].classLv==0){
            var two = [],num1=0,three=[],num2=0;
            for(var i in classData){
                if(classData[i].parentId==classData[classId].classId){
                    two[num1] = classData[i];
                    num1++;
                }
            }
            for(var i in two){
                for(var j in classData){
                    if(classData[j].parentId==two[i].classId){
                        three[num2] = classData[j];
                        num2++;
                    }
                }
            }
            return three;
        }else{
            console.log('这不是一级菜单。');
        }
    }
}]);
app.service('getCourse',['$http',function($http){
    var courseData = {};
    $http({method:'get',url:'/data/course.json'}).then(function(rep){
        courseData = rep.data;
    })
    /**
     * 根据课程类目编号查询课程
     * @param {number} classId 当前分类条件的课程类目编号
     * @param {Array} courseData 课程数据
     */
    this.getId = function(classId){
        var list=[],num=0;
        for(var i in courseData){
            if(courseData[i].courseCategory!=2){
                for(var j in courseData[i].category){
                    if(courseData[i].category[j]==classId){
                        list[num] = courseData[i];
                        num++;
                    }
                }
            }
        }
        return list;
    }
    /**
     * 根据课程分类数据集查询课程
     * @param {Array} obj 课程分类集
     */
    this.getIdObj = function(obj){
        var list=[],num=0;
        for(var i in courseData){
            list[num]=courseData[i];
            if(courseData[i].courseCategory!=2){
                for(var j in obj){
                    for(var n in courseData[i].category){
                        if(courseData[i].category[n]==obj[j].classId){
                            num++;
                        }
                    }
                }
            }
        }
        for(var x = list.length-1;x>=0;x--){
            if(list[x]==undefined){
                list.splice(x,1);
            }
        }
        return list;
    }
    /**
     * 根据课程难度等级查询数据
     * @param {number} lv 课程难度等级
     * @param {Array} data 课程数据
     */
    this.getCourseLv = function(lv,data){
        if(lv==null){
            return data;
        }
        var list=[],num=0;
        for(var i in data){
            if(data[i].courseLv==lv){
                list[num] = data[i];
                num++;
            }
        }
        return list;
    }
}]);