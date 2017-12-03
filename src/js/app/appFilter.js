//主页标题加斜杆
app.filter('pp',function(){
    return function(_default,parentId,text){
        var sss=[],a=0;
        for(var i in _default){
            if(!_default.hasOwnProperty(i))continue;
            if(_default[i][parentId]===text){
                sss[a] = _default[i];
                a++;
            }
        }
        return sss;
    }
});
//课程类型转换
app.filter('category',function(){
    return function(index){
        var category = ["课程","实战","计划"];
        return category[index];
    }
});
//课程等级转换
app.filter('level',function(){
    return function(index){
        var level = ["初级","中级","高级"];
        return level[index];
    }
});
//是否为热门课程
app.filter('hot',function(){
    return function(obj){
        if(obj.NumberOfLearners > 5000){
            return true;
        }
        return false;
    }
});
//是否为新上课程
app.filter('new',function(){
    return function(obj){
        var cur = new Date();
        var tar = new Date(obj.addTime);
        var timer = Math.ceil((cur - tar)/1000/60/60/24);
        if(timer <= 3){
            return true;
        }
        return false;
    }
});
//筛选课程标签（实战推荐、新上好课、新手入门、技术提升、前沿技术）
app.filter('abc',function(){
    return function(obj,name){
        var o = [],n=0;
        if(name==='coding'){
            for(var i in obj){
                if(!obj.hasOwnProperty(i))continue;
                if(obj[i].courseCategory===1){
                    o[n] = obj[i];
                    n++;
                }
            }
            return o;
        }
        if(name==='new'){
            for(var x in obj){
                if(!obj.hasOwnProperty(x))continue;
                if(obj[x].courseCategory!==2){
                    o[x] = obj[x];
                    o[x].addTime = new Date(obj[x].addTime);
                    n++;
                }
            }
            o.sort(function(a,b){
                return a.addTime > b.addTime ? -1 : 1;
            });
            return o;
        }
        if(name==='level'){
            for(var y in obj){
                if(!obj.hasOwnProperty(y))continue;
                if(obj[y].courseLv===0){
                    o[n] = obj[y];
                    n++;
                }
            }
            return o;
        }
        if(name==='lv'){
            for(var k in obj){
                if(!obj.hasOwnProperty(k))continue;
                if(obj[k].courseLv!==0){
                    o[n] = obj[k];
                    n++;
                }
            }
            return o;
        }
        return obj;
    }
});
//标记关键词
app.filter('keyword',function(){
    return function(txt,keywords){
        var reg = new RegExp(keywords,'i');
        txt = txt.replace(reg,'<span>'+txt.match(reg)+'</span>');
        return txt;
    }
})
//分页显示页数
app.filter('pager',function(){
    return function(arr,page,total){
        if(page-2<=0||page=="true"){
            return arr;
        }
        var list=[],num=0,c=page-2,t=page+3;
        if(page+3>total){
            c=total-4;
            t=total+1;
        }
        for(var i=c;i<t;i++){
            if(page<=total){
                list[num]=i;
                num++;
            }
        }
        return list;
    }
})