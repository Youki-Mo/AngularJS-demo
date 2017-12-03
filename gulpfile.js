var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app = {
    srcPath:'src/',
    devPath:'build/',
    prdPath:'dist/'
};

function copy(src,devPath,prdPath,isuglify,isReload){
    if(isuglify && isReload){
        gulp.src(src)
            .pipe(gulp.dest(devPath))
            .pipe($.uglify())
            .pipe(gulp.dest(prdPath))
            .pipe($.connect.reload());
    }else if(isuglify && !isReload){
        gulp.src(src)
            .pipe(gulp.dest(devPath))
            .pipe($.uglify())
            .pipe(gulp.dest(prdPath))
    }else if(!isuglify && isReload){
        gulp.src(src)
            .pipe(gulp.dest(devPath))
            .pipe(gulp.dest(prdPath))
            .pipe($.connect.reload());
    }else{
        gulp.src(src)
            .pipe(gulp.dest(devPath))
            .pipe(gulp.dest(prdPath))
    }
}

gulp.task('lib',function(){     //复制框架
    copy('node_modules/angular/*.js',app.devPath+'vendor/angular',app.prdPath+'vendor/angular',false,false);
    copy('node_modules/angular-ui-router/**/*.js',app.devPath+'vendor/angular-ui-router',app.prdPath+'vendor/angular-ui-router',false,false);
    copy('node_modules/angular-sanitize/**/*.js',app.devPath+'vendor/angular-sanitize',app.prdPath+'vendor/angular-sanitize',false,false);
    copy('node_modules/font-awesome/**/*',app.devPath+'vendor/font-awesome',app.prdPath+'vendor/font-awesome',false,false);
    copy('node_modules/oclazyload/**/*.js',app.devPath+'vendor/oclazyload',app.prdPath+'vendor/oclazyload',false,false);
    copy('src/plugin/**/*.js',app.devPath+'plugin',app.prdPath+'plugin',true,true);
});

gulp.task('html',function(){    //复制html页面
    gulp.src(app.srcPath+'**/*.html')
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload());  //这里是检测文件改变后刷新浏览器页面
});

gulp.task('json',function(){    //复制json数据
    gulp.src(app.srcPath+'data/*.json')
        .pipe(gulp.dest(app.devPath+'data'))
        .pipe(gulp.dest(app.prdPath+'data'))
        .pipe($.connect.reload());
});

gulp.task('less',function(){       //编译less并复制压缩
    gulp.src(app.srcPath+'less/index.less')
        .pipe($.less()).pipe(gulp.dest(app.devPath+'css'))
        .pipe($.cssmin()).pipe(gulp.dest(app.prdPath+'css'))
        .pipe($.connect.reload());
});

gulp.task('js',function(){      //复制js并压缩
    gulp.src([app.srcPath+'js/app/*.js',app.srcPath+'js/service/*.js',app.srcPath+'js/controller/*.js',app.srcPath+'js/baseTemplate/*.js',app.srcPath+'js/pageTemplate/**/*.js'])
        .pipe($.concat('index.js'))
        .pipe(gulp.dest(app.devPath+'js'))
        .pipe($.uglify())
        .pipe(gulp.dest(app.prdPath+'js'))
        .pipe($.connect.reload());
});

gulp.task('images',function(){      //复制图片并压缩
    gulp.src(app.srcPath+'images/**/*')
        .pipe(gulp.dest(app.devPath+'images'))
        .pipe($.imagemin())
        .pipe(gulp.dest(app.prdPath+'images'))
        .pipe($.connect.reload());
});

gulp.task('del',function(){       //清除自动化复制的文件
    gulp.src([app.devPath,app.prdPath]).pipe($.clean());
});

gulp.task('serve',['lib','html','json','less','js','images'],function(){
    $.connect.server({  //配置一个服务器
        root:[app.devPath],
        livereload:true,
        port:1000
    });
    open('http://localhost:1000');  //打开网址

    /**
     * 下面是检测文件是否发生变更，一旦变更自动重新编译复制文件
     */
    gulp.watch(app.srcPath+'plugin/**/*',['lib']);
    gulp.watch(app.srcPath+'**/*.html',['html']);
    gulp.watch(app.srcPath+'data/*.json',['json']);
    gulp.watch(app.srcPath+'less/**/*.less',['less']);
    gulp.watch(app.srcPath+'js/**/*.js',['js']);
    gulp.watch(app.srcPath+'images/**/*',['images']);

});

gulp.task('ng',['serve']);