(function($) {
var dataJson = function(){
    return {
    "mwpz": {
        "steps": "1",
        "theme": "Perfect selfie",
        "theme_info": "Set your own custom beauty settings for facial enhancement and beautifying effects. These settings will be automatically applied when you take a groufie or selfie in <b>Beauty</b> mode.",
        "detail_step": [
            "On the home screen, touch <b>Camera</b>.",
            "Touch the menu icon.",
            "Touch <b>Settings</b>.",
            "Touch <b>Perfect selfie</b>.",
            "Enable <b>Perfect selfie</b>.",
            "Touch <b>Edit personal info</b>.",
            "First, take a front photo of yourself.",
            "Next, take a side photo of yourself.",
            "Finally, take a photo of yourself looking down.",
            "On the <b>Set beauty effects</b> screen, choose the desired effects, such as a thin face, eye enlargement, or eye brightening.",
            "Touch the check mark to save your settings.",
            "In <b>Beauty mode</b> mode, touch the shutter icon to take a photo.",
            "Touch the preview icon to preview the selected beauty effects."
        ]
    },
    "wifi": {
        "steps": "2",
        //标题
        "theme": "Wi-Fi+",
        //主题简介
        "theme_info": "If you're having trouble accessing the Internet, turn on Wi-Fi+ to enable your phone to automatically connect to the network with the strongest signal (including both Wi-Fi and mobile data networks).",
        //步骤详情
        "detail_step": [
            "On the home screen, touch <b>Settings</b>.",
            "On the <b>All</b> tab, touch <b>More</b> under <b>Wireless & networks</b>.",
            "Touch <b>LINK+</b>.",
            "Touch <b>Wi-Fi+</b>.",
            "Touch <b>Wi-Fi+ settings</b>.",
            "Touch the <b>Wi-Fi+</b> switch to enable Wi-Fi+."
        ]
    },
    "xphx": {
        "steps": "4",
        "theme": "Voice wakeup",
        "theme_info": "If you can't find your phone when you know it's somewhere nearby, or your hands are tied when you need to call somebody, use voice wakeup to find your phone and place calls.",
        "detail_step": [
            "On the home screen, touch <b>Settings</b>.",
            "Touch <b>Voice wakeup</b>.",
            "Enable <b>Voice wakeup</b>.",
            "Touch <b>Wakeup keyword type</b>(we'll set up a custom keyword in this example).",
            "Touch <b>Custom wakeup keyword</b>.",
            "Enter your custom keyword.",
            "Touch the check mark.",
            "Begin recording your keyword.",
            "Touch the check mark.",
            "When your screen is locked, say your keyword to find your phone or use voice dialing."
        ]
    },
    "rwfp": {
        "steps": "5",
        "theme": "Dual windows",
        "theme_info": "Dual windows offers you more flexibility to interact with your device by giving you an active split-screen view.",
        "detail_step": [
            "Touch and hold the recent key (or swipe up using two fingers) to enable dual windows.",
            "Open two different applications in the upper and lower windows.",
            "Touch the action dot in the center for more options.",
            "&bull;&nbsp;Touch the swap icon to swap the positions of the applications.",
            "&bull;&nbsp;Touch the home icon to return to the dual windows home screen.",
            "&bull;&nbsp;Touch the close icon to close dual windows."
        ]
    }
}
}();
    var global = {
        width: $(window).width(),
        height: $(window).height(),
        ulHeight: 0,
        phoneWidth: 0,
        phoneHeight: 0,
        timer: null,
        timer2: null,
        theme: "lgkm",
        loadOver: false,
        timer3: null
    }
    global.phoneWidth = global.width * 0.5;
    global.phoneHeight = Math.ceil(global.width * 0.5 * 774 / 388);
    //global.phoneWidth=Math.ceil(global.height*388/774*0.65);
    //global.phoneHeight=global.height*0.65;
    $("#js_click").css({
        width: global.phoneWidth * 0.18,
        height: global.phoneWidth * 0.18
    });
    $("#phone_img").css({
        width: global.phoneWidth,
        height: global.phoneHeight+2+"px",
        marginLeft:((1-(global.phoneWidth/global.width))*50)+"%"
    });
    $("#phone_main,#mask").css({
        width: Math.floor(global.phoneWidth * 370 / 388),
        height: Math.floor(global.phoneHeight * 660 / 774)
    });
    $("#mask a.refresh").css({
        "margin-top":Math.floor(global.phoneHeight * 660 / 774)*0.5-25+"px"
    });
    $("#loadimg").attr("src", './mobile/css/images/phone.png').on('load',
    function() {
        $(".mobile_Container").show();
    });

    //触摸出现导航栏
    $(".toggleBtn").on('touchend',
    function() {
        $(this).hide();
        $("#leftNav").animate({
            left: 0
        },
        300);
    });

    //触摸隐藏导航栏
    $("#leftNav").on("touchend", '.back_btn',
    function() {
        $("#leftNav").animate({
            left: "-105px"
        },
        300,
        function() {
            $(".toggleBtn").show();
        });
    });

    //点击播放或者暂停按钮
    $("#playBtn").on('touchend',
    function() {
        if(!global.loadOver){
            return false;
        }
        if($("#leftNav").css("left") === "0px"){
            $("#leftNav .back_btn").trigger("touchend");
        }
        if ($(this).hasClass("pauseBtn")) {
            if($(".hand_pointer").is(":animated")){
                $(".hand_pointer").stop(true);
                $(".hand_pointer").animate({left:"-100px",top:"470px"},400,function(){
                    $(this).stop(true);
                });
            }
            $("#js_click").stop(true);
            $(this).addClass("playBtn").removeClass("pauseBtn");
            if(!!global.timer2){
                clearTimeout(global.timer2)
            }
        } else {
            if($("#mask").is(":visible")){
                $("#mask .refresh").trigger("touchend");
            }
            autoPlay();
            $(this).addClass("pauseBtn").removeClass("playBtn");
        }
    });

    //导航栏主题点击
    $("#leftNav").on("touchend", "ul>li a",
    function(e,c) {
        var _this = $(this),
        p_li = _this.parents("li");
        if(!!global.timer3){
            clearInterval(global.timer3);
        }
        if(!!global.timer){
            clearTimeout(global.timer)
        }
        if($(".hand_pointer").is(":animated")){
            $(".hand_pointer").stop(true,true);
        }
        if($("#js_trigger").is(":animated")){
            $("#js_trigger").stop(true,true);
        }
        if($("#mask").is(":visible")){
            $("#mask").hide();
            $(".hand_pointer").css({left:'-100px',top:"470px"});
        }
        if (p_li.hasClass("current")) {
            return false;
        }

        if(!c){
            if($("#playBtn").hasClass("pauseBtn")){
                $("#playBtn").trigger("touchend");
            }
            $(".hand_pointer").css({left:'-100px',top:"470px"});
        }
        p_li.addClass("current").siblings("li").removeClass("current");
        global.theme = p_li.attr("data-id");
        getJson($, global.theme);
        $(".back_btn", "#leftNav").trigger("touchend");
        themeCard(global.theme);
    });
    $("#leftNav ul>li[data-id='mwpz'] a").trigger("touchend");
    //上下翻页
    $("#steps").on('touchend', '.step_choice>a',
    function(e) {
        if($("#leftNav").css("left") === "0px"){
            $("#leftNav .back_btn").trigger("touchend");
        }
        if (!$("#step_list>ul").is(":animated")) {
            getTransform($(this).attr("class"));
        } else {
            return false;
        }
    });

    //模拟触发
    $(".theme_title").on('touchend',
    function() {
        $("#steps .step_choice a.next").trigger('touchend')
    });

    //切换步骤
    $("#step_list").on("touchend", "ul>li>a",
    function(e,c) {
        var $_this = $(this);
        if ($_this.attr("data-disable")) {
            return false;
        }
        if(!global.loadOver){
            return false;
        }
        if($("#leftNav").css("left") === "0px"){
            $("#leftNav .back_btn").trigger("touchend");
        }
        if(!c){
            if($("#playBtn").hasClass("pauseBtn")){
                $("#playBtn").trigger("touchend");
            }
            $(".hand_pointer").css({left:'-100px',top:"470px"});
        }
        var $_li = $_this.parent("li"),
        $all_li = $("#step_list>ul>li"),
        len = $all_li.length,
        curIndex = $_li.index();
        if($_this.hasClass('current')){
            return false;
        }
        if (!$_this.attr("data-disable") && !$_li.hasClass("current")) {
            $_li.addClass("current").siblings("li").removeClass("current");
            $("#curStep").text((curIndex + 1) + "/" + (len - 1));
        }
        if($("#mask").is(":visible")){
            $("#mask").hide();
            $(".hand_pointer").css({left:'-100px',top:"470px"});
        }
        if(!!global.timer){
            clearTimeout(global.timer)
        }
        if (curIndex >= 0 && curIndex < len - 1) {
            var height = curIndex - 2 >= 0 ? parseInt($all_li.eq(curIndex - 2).attr("data-top")) : 0;
            getTransform("move", height);
        }
        step_detail(global.theme, curIndex);
    });
    //移动圈点击
    $("#js_click").on("touchend",
    function(e, isTrue) {
        var $vb_demo = $(".phone_demos:visible"),
        total_rate = $vb_demo.attr("data-total"),
        step_index = parseInt($vb_demo.attr("data-step")),
        step_rate = parseInt($vb_demo.attr("data-rate")),
        temp = step_index;
        if($("#leftNav").css("left") === "0px"){
            $("#leftNav .back_btn").trigger("touchend");
        }
        if (total_rate > step_rate) {
            step_rate++;
        } else {
            step_index++;
        }
        if (temp !== step_index) {
            var isTrue = isTrue ? true: false;
            $("#step_list>ul>li>a").eq(step_index).trigger("touchend", [isTrue]);
        } else {
            var themeId = global.theme;
            if(themeId==="xphx"&&step_index ===7&&step_rate==2&&!!isTrue==false){
                $(".js_click").css({
                    "bottom": -1*global.phoneHeight,
                    "left": -1*global.phoneWidth
                });
                setTimeout(function(){
                    step_detail(themeId, step_index, step_rate);
                },1200);
                setTimeout(function(){
                    step_detail(themeId,7,3);
                },3600);
                setTimeout(function(){
                    $("#step_list>ul>li>a").eq(step_index+1).trigger("touchend", [isTrue]);
                },6000);
            }else{
                step_detail(themeId, step_index, step_rate);
            }
        }
    });
    //刷新本小节
    $("#mask").on("touchend", ".refresh",
    function() {
        $("ul>li", "#step_list").eq(0).children('a').trigger("touchend");
    });
    //浏览下一章节
    $("#mask").on("touchend", ".next_theme",
    function() {
        $("#mask").fadeOut('fast');
        $("#leftNav ul li.current").next("li").find("a").trigger("touchend");
    });
//自动播放
function autoPlay() {
    /*
    if(global.theme === "qjzn"&&$(".phone_demos7").is(":visible")&&$(".phone_demos8").is(":hidden")){
        aniAuto(0.5*global.phoneWidth,216);
    }else{
        */
        var x = $("#js_click").position();
        aniAuto(x.left + 14, x.top + 15);
}
//自动播放的动画效果
function aniAuto(x, y) {
    var $_hand_pointer = $(".hand_pointer");
    $_hand_pointer.animate({
        top: y+"px",
        left: x+"px"
    },
    1000).animate({opacity:"1"},200);
    $_hand_pointer.queue(function(){
        $(this).animate({
            width: 75+"px",
            height: 123+"px"
        },
        250, 'easeInOutQuad');
        $(this).dequeue();
    });
    if ($("ul>li:first()").hasClass('current')&&global.theme=="rwfp") {
        setTimeout(function(){
            $_hand_pointer.animate({opacity:"1"},200);
            $_hand_pointer.queue(function(){
            $(this).animate({
                width: "100px",
                height: "164px"
            },
            250, 'easeInQuad');
            $(this).dequeue();
            $(this).queue(function() {
                $("#js_click", "#phone_img").trigger("touchend",[true]);
                if ($(".phone_demos:last", "#phone_main").is(":visible")) {
                    $(".hand_pointer").animate({
                        left: -100+"px",
                        top: "120%"
                    },
                    200,
                    function() {
                        $("#playBtn").trigger("touchend");
                    });
                } else {
                   global.timer2 = setTimeout(autoPlay, 200);
                }
                $(this).dequeue();
            });
        });
        }, 2100)
    }
    else{
        $_hand_pointer.animate({opacity:"1"},200);
        $_hand_pointer.queue(function(){
            $(this).animate({
                width: "100px",
                height: "164px"
            },
            250, 'easeInQuad');
            $(this).dequeue();
            $(this).queue(function() {
                $("#js_click", "#phone_img").trigger("touchend",[true]);
                if ($(".phone_demos:last", "#phone_main").is(":visible")) {
                    $(".hand_pointer").animate({
                        left: -100+"px",
                        top: "120%"
                    },
                    200,
                    function() {
                        $("#playBtn").trigger("touchend");
                    });
                } else {
                   global.timer2 = setTimeout(autoPlay, 200);
                }
                $(this).dequeue();
            });
        });
    }

}
//首次加载，则要设置步骤ul的高度
function setHeight() {
    var ul_height = 0,
    offsetTop = 0,len = $("#step_list>ul>li").length;
    $("#step_list>ul>li").each(function(index) {
        var margin_b = $(this).css("margin-bottom").split('px')[0];
        var liHeight = $(this).height();
        if (liHeight == 0) {
            getJson($,global.theme);
            return false;
        }
        offsetTop = (offsetTop - 0) + (liHeight - 0) + (margin_b - 0);
        $(this).attr({
            "data-top": offsetTop,
            "data-height": (liHeight - 0) + (margin_b - 0)
        });
        if (index <= 2) {
            ul_height = (ul_height - 0) + (liHeight - 0) + (margin_b - 0);
        }
    });
    $("#curStep").html("1/" + (len - 1));
    $("#step_list").height(ul_height);
    // infinite();
}
//获取对应的json数据(步骤)
function getJson(jq, name) {
    var data = dataJson;
    jq("#bottom_area .theme_title").html(data[name].theme);
    jq("#step_info").html("<marquee  align='left' behavior='scroll'  direction='left'  loop='-1' scrollamount='15' scrolldelay='300'>"+data[name].theme_info+"</marquee>");
    var li = "";
    jq.each(data[name].detail_step,
    function(index, ele) {
        if (index === 0) {
            li += "<li class='current'>"
        } else {
            li += "<li>"
        }
        if (name=="rwfp"&&index>2) {
            li += '<a href="javascript:;"><label></label><samp>' + ele + '</samp></a></li>';
        }else{
            li += '<a href="javascript:;"><label>' + (index - 0 + 1) + '.</label><samp>' + ele + '</samp></a></li>';
        }
    });
    var ps="";
    if (name=="qjzn") {
        ps="<p class=\"over-ps\"><img class=\"iconImg\" src=\"public/css/images/tipIcon.svg\">You can enable or disable the Smartcare feature from <b>Settings</b> > <b>Smartcare</b>.</p>"
    }
    if (name=="rwfp") {
        ps="<p class=\"over-ps\"><img class=\"iconImg\" src=\"public/css/images/tipIcon.svg\">You can enable or disable the dual windows feature from <b>Settings</b> > <b>Dual windows</b>.</p>"
    }
    $("#step_list").html("<ul>" + li + "<li><a href='javascript:void('0');' data-disable='yes'><samp>Done</samp></a><br/>"+ps+"</li></ul>");
    setTimeout(function() {
        setHeight();
    },
    200);
}

//步骤上下移动
function getTransform(direction, offsetTop) {
    var $step_ul = $("#step_list>ul"),
    $step_li = $step_ul.children("li"),
    moveDis = 0,
    curTop = -1,
    nextIndex = -1,
    curIndex = -1,
    li_length = $step_li.length,
    offset = -$step_ul.css("top").split("px")[0] - 0;
    if (offset > 0) {
        curIndex = $step_ul.children("li[data-top='" + offset + "']").index();
    }
    if (direction === "prev") {
        if (curIndex >= 0) {
            moveDis = $step_li.eq(curIndex).attr("data-top") - $step_li.eq(curIndex).attr("data-height");
        }
    } else if (direction === "next") {
        moveDis = $step_li.eq(curIndex + 1).attr("data-top");
    } else if (direction === "move") {
        moveDis = offsetTop;
    }
    if (moveDis > 0) {
        nextIndex = $step_ul.children("li[data-top='" + moveDis + "']").index();
    }
    if (nextIndex == -1) {
        curTop = 0;
    } else {
        curTop = $step_li.eq(nextIndex).attr("data-top");
    }

    if (nextIndex + 4 <= li_length) {
        $("#step_list").height($step_li.eq(nextIndex + 3).attr("data-top") - curTop);
        $step_ul.animate({
            "top": -moveDis + "px"
        },
        "300");
    }
}

//浏览器判断
function Browser() {
    var browser = {
        versions: function() {
            var u = navigator.userAgent,
            app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1,
                //IE内核
                presto: u.indexOf('Presto') > -1,
                //opera内核
                webKit: u.indexOf('AppleWebKit') > -1,
                //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
                //是否为移动终端
                ios: !!u.match(/(i[^;]+\;(U;)? CPU.+Mac OS X)/),
                //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
                //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1,
                //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        } (),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    return browser.versions;
}

//主题切换
function themeCard(theme) {
    switch (theme) {
    case "xphx"://语音唤醒
        arr = [["screen_main"], ["xphx/2"], ["xphx/3"],["xphx/4"], ["xphx/5"],["xphx/7"],["xphx/8"],["xphx/9","xphx/10","xphx/11"],["xphx/12"],["xphx/13"]];
        break;
    case "mwpz":
        arr = [["screen_main"], ["mwpz/s_2"], ["mwpz/s_3"], ["mwpz/s_4"], ["mwpz/s_5"], ["mwpz/s_6"], ["mwpz/s_7"], ["mwpz/s_8"], ["mwpz/s_9"], ["mwpz/s_10"], ["mwpz/s_11"], ["mwpz/s_12"], ["mwpz/s_13_1", "mwpz/s_13_2"]];
        break;
    case "rwfp"://任务分屏
        arr = [["screen_main"], ["rwfp/2","rwfp/3"], ["rwfp/4"],["rwfp/5","rwfp/6"],["rwfp/7","rwfp/8"],["rwfp/9","rwfp/10"]];
        break;
    case "wifi":
        arr = [["screen_main"],["wifi/2"], ["wifi/3"], ["wifi/4"], ["wifi/5"],["wifi/6","wifi/7"]];
        break;
    }
    var div = "";
    for (var i = 0,k = 1; i < arr.length; i++) {
        for (var j = 0,arr2 = arr[i], len = arr2.length; j < len; j++) {
            div += "<div class='phone_demos phone_demos" + (k++) + "' data-total='" + len + "' data-step='" + i + "' data-rate='" + (j + 1) + "'>";
            div += "<img src='mobile/images/" + arr2[j] + ".jpg' /></div>";
        }
    }
    $("#phone_main").html(div);
    global.loadOver = false;
    loadImg(theme);
}
//判断图片是否加载完毕
function loadImg(theme){
    var imgdefereds=[];
    $('#phone_main img').each(function(){
        var dfd=$.Deferred();
        $(this).bind('load',function(){
           dfd.resolve();
        }).bind('error',function(){
        //图片加载错误，加入错误处理
        // dfd.resolve();
        })
        if(this.complete) setTimeout(function(){
           dfd.resolve();
        },1000);
           imgdefereds.push(dfd);
    });
    $.when.apply(null,imgdefereds).done(function(){
        //所有图片加载完毕的时候就可以操作了
        global.loadOver = true;
        step_detail(theme, 0);
    });
}
//点击步骤详情
function step_detail(theme, curIdx, num) {
    switch (theme) {
    case "xphx":
        theme_xphx(curIdx, num);
        break;
    case "mwpz":
        theme_mwpz(curIdx, num);
        break;
    case "rwfp":
        theme_rwfp(curIdx, num);
        break;
    case "wifi":
        theme_wifi(curIdx, num);
        break;
    }
}

//魅我拍照步骤操作
function theme_mwpz(index, num) {
    var _num = !num ? 1 : num;
    var parmArr = [];
    switch (index) {
    case 0:
        parmArr = [1, ".295", "0.59"];
        break;
    case 1:
        parmArr = [2, ".855", "0.805"];
        break;
    case 2:
        parmArr = [3, "0.19", "0.408"];
        break;
    case 3:
        parmArr = [4, "0.51", "0.09"];
        break;
    case 4:
        parmArr = [5, "0.80", "0.77"];
        break;
    case 5:
        parmArr = [6, "0.725", "0.06"];
        break;
    case 6:
        parmArr = [7, "0.154", "0.408"];
        break;
    case 7:
        parmArr = [8, "0.154", "0.408"];
        break;
    case 8:
        parmArr = [9, "0.154", "0.408"];
        break;
    case 9:
        parmArr = [10, "0.263", "0.172"];
        break;
    case 10:
        parmArr = [11, ".85", ".80"];
        break;
    case 11:
        parmArr = [12, ".154", ".408"];
        break;
    case 12:
        if (_num === 2) {
            parmArr = [14, "-1", "-1"];
        } else {
            parmArr = [13, "0.145", "0.090"];
        }
        break;
    }
    pic_click_move(parmArr[0], parmArr[1], parmArr[2]);
}

 //wifi+操作
function theme_wifi(index, num) {
    var _num = !num ? 1 : num;
    var parmArr = [];
    switch (index) {
    case 0:
        parmArr = [1, .292, .234];
        break;
    case 1:
        parmArr = [2, .45, .12];
        break;
    case 2:
        parmArr = [3, .73, .02];
        break;
    case 3:
        parmArr = [4, .77, .02];
        break;
    case 4:
        parmArr = [5, .14, .4];
        break;
    case 5:
        if (_num==2) {
            parmArr = [7, -1, -1];
        }
        else{
            parmArr = [6, .64, .80];
        }
        break;
    }
    pic_click_move(parmArr[0], parmArr[1], parmArr[2]);
}

//智能语音唤醒步骤操作
var theme_xphx=function(index, num){
    var _num = !num ? 1 : num;
    var parmArr = [];
    switch (index) {
    case 0:
        parmArr = [1, .292, .234];
        break;
    case 1:
        parmArr = [2, .48, .10];
        break;
    case 2:
        parmArr = [3, .415, .78];
        break;
    case 3:
        parmArr = [4, .30, .40];
        break;
    case 4:
        parmArr = [5, .443, .70];
        break;
    case 5:
        parmArr = [6, .73, .42];
        break;
    case 6:
        parmArr = [7, .83, .82];
        break;
    case 7:
        if (_num==3) {
            parmArr = [10, -1, -1];
        }
        else if (_num===2) {
            parmArr = [9, -1,-1];
        }else{
            parmArr = [8, .203, .408];
        }
        break;
    case 8:
            parmArr = [11, .84, .82];
        break;
    case 9:
        parmArr = [12, -85, -85];
        break;
    }
    pic_click_move(parmArr[0], parmArr[1], parmArr[2]);
};


//任务分屏步骤操作
var theme_rwfp=function(index,num){
     var _num = !num ? 1 : num;
    var parmArr = [];
    switch (index) {
    case 0:
        parmArr = [1, .06, .625];
        break;
    case 1:
        switch(_num){
            case 1:
                parmArr = [2, .343, .41];
            break;
            case 2:
                parmArr = [3, .835, .58];
            break;
        }
    break;
    case 2:
        parmArr = [4, .481, .407];
    break;
    case 3:
        switch(_num){
           case 1:
                parmArr = [5, .48, .285];
            break;
            case 2:
                parmArr = [6, .481, .407];
            break;
            }
            break;
            case 4:
                switch(_num){
                   case 1:
                        parmArr = [7, .48, .405];
                    break;
                    case 2:
                        parmArr = [8, .481, .407];
                    break;
                }
            break;
            case 5:
                switch(_num){
                    case 1:
                        parmArr = [9, .48, .47];
                    break;
                    case 2:
                        parmArr = [10, -1, -1];
                    break;
                }
            break;
    break;
    }
    pic_click_move(parmArr[0], parmArr[1], parmArr[2]);
};


//执行背景切换和移动点击圆圈
function pic_click_move(n, x, y, isHidden) {
    var $phone_show_demo = $(".phone_demos:visible", "#phone_main");
    $phone_demo = $(".phone_demos", "#phone_main");
    if (!isHidden) {
        $phone_show_demo.fadeOut();
        $phone_demo.eq(n - 1).fadeIn();
    }
    $(".js_click").css({
        "bottom": x*global.phoneHeight,
        "left": y*global.phoneWidth
    });
    if ($phone_demo.length === n) {
        var $step_li = $("#step_list>ul>li");
        if (global.theme != "xphx") {
            $step_li.removeClass("current").eq($step_li.length - 1).addClass("current");
        }
        global.timer = setTimeout(function() {
            if (global.theme == "xphx") {
                $step_li.removeClass("current").eq($step_li.length - 1).addClass("current");
            }
            if (global.theme == "rwfp") {
                $(".next_theme").hide();
            } else if ($(".next_theme").is(":hidden")) {
                $(".next_theme").show();
            }
            $("#mask").fadeIn();
        },
        2000);
    }
}
$("#phone_main").on('touchend',"#bar_btn,#swipe_btn",function(){
    $("#js_click").trigger("touchend");
});

})(jQuery);