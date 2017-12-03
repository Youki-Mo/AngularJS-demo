;(function(window,document){
    'use strict';
    var Carousel = function(parent,options){
        if(!(this instanceof Carousel)){
            return new Carousel(parent,options);
        }
        this.options = this.extend({
            container:'.main',  //容器
            box:'.box',     //盒子
            prev:'.prev',   //上一张
            next:'.next',   //下一张
            active:'.active',   //选中样式
            pager:true,     //是否显示焦点图
            pagerNum:true,
            starTime:3000,  //轮播停留时间
            slideTime:500,   //盒子滑动时间
            Append:function(){}
        },options);
        this.wrapper = document.querySelector(parent);
        this.container = document.querySelector(this.options.container);
        this.box = document.querySelectorAll(this.options.box);
        this.prev = document.querySelector(this.options.prev);
        this.next = document.querySelector(this.options.next);
        this.timer = null;
        this.isSlider = true;
        this.carousel_prev = 'prev';
        this.carousel_next = 'next';
        this.init();
    };
    Carousel.prototype={
        constructor:Carousel,
        init:function(){
            this.event();
        },
        extend:function(_default,options){
            for(var i in options){
                if(!options.hasOwnProperty(i)){continue;}
                _default[i] = options[i];
            }
            return _default;
        },
        getIndex:function(arr,tar){
            for(var i=arr.length-1;i>=0;i--){
                if(arr[i]===tar){
                    return i;
                }
            }
        },
        createPager:function(){
            var focus = document.createElement('ul');
            focus.className = 'focus';
            var cons = 0;
            for(var i=this.box.length;i>0;i--){
                var a = document.createElement('li');
                if(i===this.box.length){
                    a.className = this.options.active.replace('.','');
                }
                if(this.options.pagerNum){
                    a.innerText = ++cons;
                }
                focus.appendChild(a);
            }
            this.wrapper.appendChild(focus);
            this.pager = this.wrapper.querySelector('.focus');
            this.oLi = this.wrapper.querySelectorAll('.focus li');
        },
        slider:function(init,target,direction){
            var _this = this,
                active = this.options.active.replace('.','');
            if(this.isSlider){
                this.isSlider=false;
                this.box[init].style.transition = 'left '+this.options.slideTime+'ms';
                this.box[target].style.transition = 'left '+this.options.slideTime+'ms';
                this.options.Append(target);
                if(direction===this.carousel_next){
                    this.box[target].classList.add(this.carousel_next);
                    this.box[init].style.left = -this.wrapper.offsetWidth+'px';
                }else{
                    this.box[target].classList.add(this.carousel_prev);
                    this.box[init].style.left = this.wrapper.offsetWidth+'px';
                }
                this.box[target].style.left = 0+'px';
                if(this.options.pager){
                    this.oLi[target].classList.add(active);
                    this.oLi[init].classList.remove(active);
                }
                setTimeout(function(){
                    if(direction===_this.carousel_next){
                        _this.box[target].classList.remove(_this.carousel_next);
                    }else{
                        _this.box[target].classList.remove(_this.carousel_prev);
                    }
                    _this.box[init].classList.remove(active);
                    _this.box[target].classList.add(active);
                    _this.box[init].removeAttribute('style');
                    _this.box[target].removeAttribute('style');
                    _this.isSlider=true;
                },this.options.slideTime);
            }
        },
        event:function(){
            var _this = this;
            /* 轮播 */
            this.timer = setInterval(function(){
                var aBox = _this.wrapper.querySelector(_this.options.active),
                    init = _this.getIndex(_this.box,aBox),
                    target = init+1;
                if(target>_this.box.length-1){
                    target=0;
                }
                _this.slider(init,target,_this.carousel_next);
            },this.options.starTime);
            /* 上一张 */
            this.prev.addEventListener('click',function(){
                var aBox = _this.wrapper.querySelector(_this.options.active),
                    init = _this.getIndex(_this.box,aBox),
                    target = init-1;
                if(target<0){
                    target=_this.box.length-1;
                }
                _this.slider(init,target,_this.carousel_prev);
            });
            /* 下一张 */
            this.next.addEventListener('click',function(){
                var aBox = _this.wrapper.querySelector(_this.options.active),
                    init = _this.getIndex(_this.box,aBox),
                    target = init+1;
                if(target>_this.box.length-1){
                    target=0;
                }
                _this.slider(init,target,_this.carousel_next);
            });
            /* 移入 */
            this.wrapper.addEventListener('mouseover',function(){
                clearInterval(_this.timer);
            });
            /* 移出 */
            this.wrapper.addEventListener('mouseout',function(event){
                _this.timer = setInterval(function(){
                    var aBox = _this.wrapper.querySelector(_this.options.active),
                        init = _this.getIndex(_this.box,aBox),
                        target = init+1;
                    if(target>_this.box.length-1){
                        target=0;
                    }
                    _this.slider(init,target,_this.carousel_next);
                },_this.options.starTime);
            });
            //焦点图点击
            if(this.options.pager){
                this.createPager();
                for(var j in this.oLi){
                    if(!this.oLi.hasOwnProperty(j))continue;
                    this.oLi[j].addEventListener('click',function(){
                        var aLi = _this.pager.querySelector(_this.options.active),
                            init = _this.getIndex(_this.oLi,aLi),
                            target = _this.getIndex(_this.oLi,this);
                        if(target-init>0){
                            _this.slider(init,target,_this.carousel_next);
                        }else if(target-init<0){
                            _this.slider(init,target,_this.carousel_prev);
                        }
                    });
                }
            }
        }
    };
    window.Carousel = Carousel;
})(window,document);