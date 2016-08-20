
$(document).ready(function () {

    /* 滚动屏幕 */
    var idx = 0, canSwitch = true, curr = 0;
    var oWinwidth = $(window).width();
    var oWinheight = $(window).height();

    $( "section" ).eq( 0 ).addClass( "active" );
    $( ".nav-item" ).eq( 0 ).addClass( "active" ).siblings().removeClass( "active" );


    // 定义判断鼠标是向上还是向下滑动的函数
    function scrollFun ( e ) {
        var direct = null;        // 定义向上还是向下的方向标识
        var e = e || window.event;
        if ( e.wheelDelta ) {     // 判断浏览器IE , 谷歌滑轮事件
            if ( e.wheelDelta > 0 ) {
                // 说明滑轮向上滚动
                direct = "up";
            }
            if ( e.wheelDelta < 0 ) {
                // 说明鼠标向下滚动
                direct = "down";
            }
        } else if ( e.detail ) {    // 火狐滑轮事件
            if ( e.detail > 0 ) {
                // 滑轮向下滚动
                direct = "down";
            }
            if ( e.detail < 0 ) {
                // 滑动向上滚动
                direct = "up";
            }
        }
        pageSwitch( direct );
    }
    // 给页面绑定滑轮滚动事件(火狐)
    if ( document.addEventListener ) {
        document.addEventListener( "DOMMouseScroll",scrollFun,false );
    }
    // 滚动滑轮触发scrollFun方法
    window.onmousewheel = scrollFun;
    // 页面切换
    function pageSwitch (direct) {

        if ( direct == "up" ) {
            pageUp();
        } else if ( direct == "down" ) {
            pageDown();
        }
    }
    function pageDown () {
        if ( canSwitch ) {
            canSwitch = false;
            idx++;
            pageNow( idx );

            if ( idx > 5 ) {
                idx = 5;
                canSwitch = true;
                return false;   // 阻止继续向下滚动
            }
            $( "div.mask" ).animate({ top: 0 }, 400, function () {
                $( "section" ).eq( idx ).addClass( "active" ).siblings().removeClass( "active" );
                $( "li.nav-item" ).eq( idx ).addClass( "active" ).siblings().removeClass( "active" );
                $( this ).stop().animate({ top: "-100%" }, 400, function () {
                    $( this ).css( "top", "100%" );
                    canSwitch = true;
                });
            });
            curr = idx;
        }
    }
    function pageUp () {
        if ( canSwitch ) {
            canSwitch = false;
            idx--;
            pageNow( idx );

            if ( idx < 0 ) {
                idx = 0;
                canSwitch = true;
                return false;
            }
            $( "div.mask" ).css( "top", "-100%" );
            $( "div.mask" ).stop().animate({ top: 0 }, 400, function () {
                $( "section" ).eq( idx ).addClass( "active" ).siblings().removeClass( "active" );
                $( "li.nav-item" ).eq( idx ).addClass( "active" ).siblings().removeClass( "active" );
                $( this ).stop().animate({ top: "100%" }, 400, function () {
                    canSwitch = true;
                });
            });
            curr = idx;
        }
    }

    $( "#navigation" ).hover(function () {
        $( this ).addClass( "mouseenter-box" );
        $( ".nav-item" ).bind({
            click: function () {
                $( this ).addClass( "active" ).siblings().removeClass( "active" );
                if ( canSwitch ) {
                    idx = $( this ).index();
                    if ( curr != idx ) {
                        canSwitch = false;
                        pageNow( idx );
                        var mask = curr < idx ? {
                            topa: "100%",
                            topb: "-100%"
                        } : {
                            topa: "-100%",
                            topb: "100%"
                        };
                        $( ".mask" ).css( "top", mask.topa );
                        $( ".mask" ).stop().animate({
                            top: 0
                        },400,function () {
                            $( ".content section" ).eq( idx ).addClass( "active" ).siblings().removeClass( "active" );
                            $( ".mask" ).stop().animate({ top: mask.topb }, 400, function () {
                                canSwitch = true;
                            });
                        });
                        curr = idx;
                    }
                }
            }
        });
    }, function () {
        $( this ).removeClass( "mouseenter-box" );
    });

    function pageNow ( now ) {
        if ( oWinwidth > 640 ) {
            switch ( now ) {
                case 1 :
                    showAbout();
                    break;
                case 2 :
                    showDescription();
                    break;
                case 3 :
                    showChoose();
                    break;
                case 5 :
                    showContact();
                    break;
            }
        }
    }

    /* 侧边栏鼠标移入移出 */
    /*$( "#navigation" ).hover(function () {
        navClass();
    });*/
    $( ".hamburger-menu" ).click(function() {
        navHasClass();
    });
    $( ".nav-content li.nav-item" ).click(function( e ) {
        if ( canSwitch ) {
            idx = $( this ).index();
            pageNow( idx );
        }
    });
    function navHasClass () {
        if ( $( "#navigation" ).hasClass( "mouseenter-box" ) ) {
            $( "#navigation").removeClass( "mouseenter-box" );
        } else {
            $( "#navigation").addClass( "mouseenter-box" );
        }
    }

    /* About 部分 图片铺卷开来 */
    function showAbout () {
        $( ".about-left-content" ).animate({ width: "50%" },2000);

        $( ".about-right-content" ).fadeIn( 3000 );
    }


    /* Description 部分从右侧慢慢显现 */
    function showDescription () {
        if (oWinwidth > 640) {
            $( ".description-text" ).animate({
                right: "0"
            },1500);
        }
    }


    /* Choose us 部分从下向上显现 */
    function showChoose () {
        $( ".choose-content" ).animate( { top: "50%" },1000 );
    }

    /* Contact us 部分的线条动画 */
    function showContact () {
        $( "section.contact .left-line , section.contact .right-line" ).addClass( "line-animate" );
    }


    /* Service 部分图片轮播 */
    var clearTimer = null;
    var index = 0;
    $( ".service-pages li" ).hover(function () {
        clearInterval( clearTimer );
        index = $( this ).index();
        $( this ).addClass( "active" ).siblings().removeClass( "active" ).css( "background","" );
        $( ".service-item" ).eq( index ).addClass( "active" ).fadeIn().siblings().removeClass( "active" ).fadeOut();
    }, function () {
        auto();
    });
    // 封装自动轮播的方法
    function auto () {
        clearTimer = setInterval(function () {
            index++;
            if ( index > 5 ) {
                index = 0;
            }
            $( ".service-pages li" ).eq( index ).addClass( "active" ).siblings().removeClass( "active" );
            $( ".service-item" ).eq( index ).addClass( "active" ).fadeIn(500).siblings().removeClass( "active" ).fadeOut(500);
        },4000 );
    }
    auto();

    // 箭头的事件
    $( ".down" ).click(function () {
        pageDown();
    });

    /* 手机端滑动 */
    if ( oWinwidth < 640 ) {
        $( ".mask" ).css( "display", "none" );

        // 全屏滑动
        var swiper = new Swiper( ".service-swiper-container",{
            pagination: ".swiper-pagination",
            paginationClickable: true,
            paginationBulletRender: function ( index, className ) {
                return '<li class="' + className + '">' + (index+1) + '</li>';
            }
        });

        $( ".content" ).addClass( "swiper-container" );
        $( ".container" ).addClass( "swiper-wrapper" );
        $( "section" ).addClass( "swiper-slide active" );

        var mobile = new Swiper( ".content",{
            direction: "vertical"
        });
    }


    // 背景跟随鼠标小范围偏移
    $( "section.intro" ).mousemove(function( e ) {
        var x1 = e.pageX,
            y1 = e.pageY,
            middle_x = $(window).width() / 2,
            middle_y = $(window).height() / 2,
            sta_x = x1 - middle_x,
            sta_y = y1 - middle_y,
            once = 50;
        $(".star").css({
            "top": -sta_y / once,
            "left": -sta_x / once
        });
    });
});
