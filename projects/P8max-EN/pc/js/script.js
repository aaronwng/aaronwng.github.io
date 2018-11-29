$(document).ready(function() {
    /*设置全局对象*/
    var loadOver = false;
    var golbalObj = {
        stepObj: {
            $stepDiv: $("#left_container .operation_steps"),
            $ul: $("#left_container .operation_steps>ul"),
            $li: $("#left_container .operation_steps>ul>li"),
            $over: $("#left_container .operation_steps .over"),
            topArr: [],
            timer: null,
            timer2: null
        }
    }
    // themeCard("lgkm");
    // setTimeout(setAttr, 200);
    //播放暂停按钮
    $("#autoBtn").on('click',
    function() {
        if(!loadOver){
            return false;
        }
        if ($(this).hasClass("suspendedBtn")) {
            $(".hand_pointer").stop(true);
            $(".click_trigger").stop(true);
            if(!!golbalObj.stepObj.timer2){
                clearTimeout(golbalObj.stepObj.timer2)
            }
            $(this).addClass("playBtn").removeClass("suspendedBtn");
        } else {
            if($("#mask").is(":visible")){
                $("#mask .refresh").trigger("click");
            }
            autoPlay();
            $(this).addClass("suspendedBtn").removeClass("playBtn");
        }
    });

    //主题切换
    $("#simulatorContainer").on("click",".nav li",
    function(e,c) {
        if(!!golbalObj.stepObj.timer){
            clearTimeout(golbalObj.stepObj.timer)
        }
        if($(".hand_pointer").is(":animated")){
            $(".hand_pointer").stop(true,true);
        }
        if($(".click_trigger").is(":animated")){
            $(".click_trigger").stop(true,true);
        }
        if($("#mask").is(":visible")){
            $("#mask").hide();
            $(".hand_pointer").css({left:'-100px',top:"470px"});
        }
        if ($(this).hasClass("current")) {
            return false;
        }
        if(!c){
            if($("#autoBtn").hasClass("suspendedBtn")){
                $("#autoBtn").trigger("click");
            }
            $(".hand_pointer").css({left:'-100px',top:"470px"});
        }
        $(this).siblings('li').removeClass("current").end().addClass("current");
        var getDataId = $(this).attr("data-id");
        $("#left_container").html($("#step_" + getDataId).html());
        setTimeout(setAttr, 200);
        themeCard(getDataId);
    });
    $("#footer_container .nav li.mwpz").trigger("click");
    //步骤点击
    $("#left_container").on("click", ".operation_steps>ul>li",
    function(e,c) {
        if(!loadOver){
            return false;
        }
        var _this = $(this),
        index = _this.index(),
        $operation_steps = _this.parents(".operation_steps");
        theme = $operation_steps.attr("data-theme"),
        $ul = $operation_steps.children("ul"),
        $li = $ul.find("li"),
        middleNode = $operation_steps.attr("data-middlenode");
        if(!c){
            if($("#autoBtn").hasClass("suspendedBtn")){
                $("#autoBtn").trigger("click");
            }
            $(".hand_pointer").css({left:'-100px',top:"470px"});
        }
        if (index >= middleNode) {
            var moveTop = $li.eq(index).attr("data-top") - $li.eq(middleNode).attr("data-top");
            if (moveTop >= $ul.attr("data-exceed")) {
                animateUl($ul.attr("data-exceed"));
            } else {
                animateUl(moveTop);
            }
        } else {
            animateUl(0);
        }
        if (_this.hasClass('current')) {
            return false;
        }
        if($("#mask").is(":visible")){
            $("#mask").hide();
            $(".hand_pointer").css({left:'-100px',top:"470px"});
        }
        if(!!golbalObj.stepObj.timer){
            clearTimeout(golbalObj.stepObj.timer)
        }
        golbalObj.stepObj.$over.removeClass('current');
        _this.siblings('li').removeClass('current').end().addClass("current");
        step_detail(theme, index);
    });

    //操作步骤圈圈点击
    $("#phone").on("click", ".click_trigger",
    function(e,isTrue) {
        var $vb_demo = $(".phone_demos:visible"),
        total_rate = $vb_demo.attr("data-total"),
        step_index = parseInt($vb_demo.attr("data-step")),
        step_rate = parseInt($vb_demo.attr("data-rate")),
        temp = step_index;
        if (total_rate > step_rate) {
            step_rate++;
        } else {
            step_index++;
        }
        if (temp !== step_index) {
            var isTrue = isTrue?true:false;
            $(".operation_steps>ul>li", "#left_container").eq(step_index).trigger("click",[isTrue]);
        } else {
            var themeId = golbalObj.stepObj.$stepDiv.attr("data-theme");
            if(themeId==="xphx"&&step_index ===7&&step_rate==2&&!!isTrue==false){
                $(".click_trigger").css({
                    "bottom": "-85px",
                    "left": "-85px"
                });
                setTimeout(function(){
                    step_detail(themeId, step_index, step_rate);
                },1200);
                setTimeout(function(){
                    step_detail(themeId,7,3);
                },3600);
                setTimeout(function(){
                    $(".operation_steps>ul>li", "#left_container").eq(step_index+1).trigger("click",[isTrue]);
                },6000);
            }else{
                step_detail(themeId, step_index, step_rate);
            }
        }
    });
    //刷新本小节
    $("#mask").on("click", ".refresh",
    function() {
        $(".operation_steps>ul>li", "#left_container").eq(0).trigger("click");
    });
    //浏览下一章节
    $("#mask").on("click", ".next_theme",
    function() {
        $("#mask").fadeOut('fast');
        $("#footer_container .nav li.current").next("li").trigger("click");
    });
    //设置ul li 步骤div的属性
    function setAttr() {
        /*headerHeight 主题title的高度、ulHeight 步骤中ul的高度、top li标签对上的偏移量、prevTop 上一个li标签对上的偏移量、middleNum 确定中间li的位置*/
        golbalObj.stepObj = {
            $stepDiv: $("#left_container .operation_steps"),
            $ul: $("#left_container .operation_steps>ul"),
            $li: $("#left_container .operation_steps>ul>li"),
            $over: $("#left_container .operation_steps .over"),
            topArr: []
        };
        var _step = golbalObj.stepObj;
        var divHeight = 475 - 30 - $("#left_container header.theme_title").height(),
        ulHeight = _step.$ul.height() - 0 + _step.$over.height() + 5,
        top = 0,
        prevTop = 0,
        middleNum = Math.floor(divHeight / 2);
        $("#left_container .operation_steps").attr("data-maxHeight", divHeight);
        if (divHeight < ulHeight) {
            _step.$ul.attr({
                "data-exceed": ulHeight - divHeight
            });
            _step.$li.each(function(index, ele) {
                prevTop = top;
                top += $(ele).height() - 0 + 10;
                var eleHeight = $(ele).height() - 0 + 10;
                $(ele).attr({
                    "data-top": top,
                    "data-height": eleHeight
                });
                _step.topArr[index] = top;
                if (prevTop < middleNum && middleNum <= top) {
                    _step.$stepDiv.attr("data-middleNode", index);
                }
            });
            setStepHeight();
        } else {
            _step.$ul.attr({
                "data-exceed": 0
            });
        }
    }
    //设置步骤div的高度
    function setStepHeight() {
        var _step = golbalObj.stepObj;
        marginTop = Math.abs(_step.$ul.css("margin-top").match(/\d+/)[0]),
        maxHeight = _step.$stepDiv.attr("data-maxheight"),
        needHeight = maxHeight - 0 + marginTop,
        div_heihgt = maxHeight;
        for (var i = 0,
        topArr = _step.topArr; i < topArr.length; i++) {
            if (needHeight == topArr[i]) {
                div_heihgt = topArr[i] - marginTop;
                break;
            } else if (topArr[i] > needHeight) {
                div_heihgt = topArr[i - 1] - marginTop;
                break;
            } else if (topArr[topArr.length - 1] < needHeight) {
                div_heihgt = topArr[topArr.length - 1] - marginTop;
                div_heihgt = div_heihgt + 16 <= maxHeight ? maxHeight: div_heihgt;
                break;
            }
        }
        if(window.attachEvent){
            div_heihgt = div_heihgt-6;
        }
        _step.$stepDiv.height(div_heihgt);
    }

    //Ul上下移动动画
    function animateUl(moveTop) {
        var _step = golbalObj.stepObj,
        move = 0,
        maxMove = _step.$ul.attr("data-exceed");
        for (var i = 0,
        topArr = _step.topArr; i < topArr.length; i++) {
            //如果moveTop=0或者等于最大移动偏移量
            if (moveTop === 0) { //这里有个bug就是当前偏移量已经超过最偏移量时取最大偏移量，但却不能取对应的正值
                move = 0;
                break;
            } else if (moveTop === maxMove && topArr[i] >= moveTop) {
                move = topArr[i];
                break;
            } else if (moveTop < topArr[0]) { //如果偏移量少于第一个数值，那么直接取第一个数值
                move = topArr[0];
                break;
            } else if (i > 0 && topArr[i - 1] <= moveTop && moveTop <= topArr[i]) { //如果i超过数组的第一个值,并且前一个数少于等于、当前这个数要大于等于当前偏移量
                //比较前一个数字与当前数跟偏移量取绝对值，绝对值越少取相应的值
                if (Math.abs(moveTop - topArr[i - 1]) < Math.abs(moveTop - topArr[i])) {
                    move = topArr[i - 1];
                    break;
                } else {
                    move = topArr[i];
                    break;
                }
            }
        }
        //fix overflow:scroll bug
        if (_step.$stepDiv.css("overflowY")=="scroll") {
            _step.$stepDiv.animate({
                "scrollTop": move + "px"
            },
            400,
            function() {
                setStepHeight()
            });
        }else{
            _step.$ul.animate({
                "margin-top": -move + "px"
            },
            400,
            function() {
                setStepHeight()
            });
        }

    }
    //自动播放
    function autoPlay() {
        var x = $(".click_trigger").position();
        /**
        if($(".operation_steps").attr("data-theme") ==="qjzn"&&$(".phone_demos1").is(":visible")&&$(".phone_demos2").is(":hidden")){
            aniAuto(98,221);
        }else{
            aniAuto(x.left + 18, x.top + 16);
        }
        **/
        aniAuto(x.left + 18, x.top + 16);
    }

    //自动播放的动画效果
    function aniAuto(x, y) {
        var $_hand_pointer = $(".hand_pointer");
        //移动
        $_hand_pointer.animate({
            top: y+"px",
            left: x+"px"
        },
        1000).animate({opacity:"1"},200);
        //向下点击
        $_hand_pointer.queue(function(){
            $(this).animate({
                width: 75+"px",
                height: 123+"px"
            },
            250, 'easeInOutQuad');
            $(this).dequeue();
        });
        //rwfp时长按效果
        if (golbalObj.stepObj.$stepDiv.attr("data-theme")=="rwfp"&&$(".operation_steps>ul>li:first").hasClass('current')) {
            setTimeout(function(){
                $_hand_pointer.animate({opacity:"1"},200);
                //抬手
                $_hand_pointer.queue(function(){
                    $(this).animate({
                        width: "100px",
                        height: "164px"
                    },
                    250, 'easeInQuad');
                    $(this).dequeue();
                    $(this).queue(function() {
                        $(".click_trigger", "#phone").trigger("click",[true]);
                        if ($(".phoneContent>.phone_demos:last", "#phone").is(":visible")) {
                            $(".hand_pointer").animate({
                                left: -100+"px",
                                top: 470+"px"
                            },
                            200,
                            function() {
                                $("#autoBtn").trigger("click");
                            });
                        } else {
                            golbalObj.stepObj.timer2 = setTimeout(autoPlay, 200);
                        }
                        $(this).dequeue();
                    });
                });
            }, 2100)
        }
        else
        {
            $_hand_pointer.animate({opacity:"1"},200);
            //抬手
            $_hand_pointer.queue(function(){
                $(this).animate({
                    width: "100px",
                    height: "164px"
                },
                250, 'easeInQuad');
                $(this).dequeue();
                $(this).queue(function() {
                    $(".click_trigger", "#phone").trigger("click",[true]);
                    if ($(".phoneContent>.phone_demos:last", "#phone").is(":visible")) {
                        $(".hand_pointer").animate({
                            left: -100+"px",
                            top: 470+"px"
                        },
                        200,
                        function() {
                            $("#autoBtn").trigger("click");
                        });
                    } else {
                        golbalObj.stepObj.timer2 = setTimeout(autoPlay, 200);
                    }
                    $(this).dequeue();
                });
            });
        }
    }


    //判断图片是否加载完毕
    function loadImg(theme){
        if(window.attachEvent){
            loadOver = true;
            step_detail(theme, 0);
        }else{
            var imgdefereds=[];
            $('#phoneContent img').each(function(){
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
                loadOver = true;
                step_detail(theme, 0);
            });
        }
    }
    //执行背景切换和移动点击圆圈
    function pic_click_move(n, x, y, isHidden) {
        var $phone_show_demo = $(".phone_demos:visible", "#phone");
        $phone_demo = $(".phone_demos", "#phone");
        if (!isHidden) {
            $phone_show_demo.fadeOut();
            $phone_demo.eq(n - 1).fadeIn();
        }
        $(".click_trigger").css({
            "bottom": x,
            "left": y
        });
        if ($phone_demo.length === n) {
            if (golbalObj.stepObj.$stepDiv.attr("data-theme")!="xphx") {
                golbalObj.stepObj.$li.removeClass('current');
                golbalObj.stepObj.$over.addClass("current");
            }
            golbalObj.stepObj.timer = setTimeout(function() {
                if (golbalObj.stepObj.$stepDiv.attr("data-theme")=="xphx") {
                    golbalObj.stepObj.$li.removeClass('current');
                    golbalObj.stepObj.$over.addClass("current");
                }
                if(golbalObj.stepObj.$stepDiv.attr("data-theme")=="rwfp"){
                    $(".next_theme").hide();
                }else if($(".next_theme").is(":hidden")){
                    $(".next_theme").show();
                }
                    $("#mask").fadeIn();
            },
            2000);
        }
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
        case "dyms":
            theme_dyms(curIdx, num);
            break;
        case "wifi":
            theme_wifi(curIdx, num);
            break;
        }
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
        case "dyms":
            arr = [["dyms/s_2--7"], ["dyms/s_3--8"], ["dyms/s_4--9"], ["dyms/s_5"], ["dyms/s_6"], ["dyms/s_2--7"], ["dyms/7","dyms/7-1","dyms/s_10"],["dyms/s_11"], ["dyms/s_12"], ["dyms/s_13"], ["dyms/s_14"], ["dyms/s_15_1", "dyms/s_15_2"]];
            break;
        case "wifi":
            arr = [["screen_main"],["wifi/2"], ["wifi/3"], ["wifi/4"], ["wifi/5"],["wifi/6","wifi/7"]];
            break;
        }
        if (theme!="dyms") {
            changePhoneBkImg(false);
        }
        var div = "";
        for (var i = 0,k = 1; i < arr.length; i++) {
            for (var j = 0,arr2 = arr[i], len = arr2.length; j < len; j++) {
                div += "<div class='phone_demos phone_demos" + (k++) + "' data-total='" + len + "' data-step='" + i + "' data-rate='" + (j + 1) + "'>";
                div += "<img src='./pc/images/" + arr2[j] + ".jpg' /></div>";
            }
        }
        $("#phoneContent").html(div);
        loadOver = false;
        loadImg(theme);
    }
    //魅我拍照步骤操作
    function theme_mwpz(index, num) {
        var _num = !num ? 1 : num;
        var parmArr = [];
        switch (index) {
        case 0:
            parmArr = [1, 146, 151];
            break;
        case 1:
            parmArr = [2, 432, 207];
            break;
        case 2:
            parmArr = [3, 93, 106];
            break;
        case 3:
            parmArr = [4, 255, 23];
            break;
        case 4:
            parmArr = [5, 400, 202];
            break;
        case 5:
            parmArr = [6, 365, 22];
            break;
        case 6:
            parmArr = [7, 76, 106];
            break;
        case 7:
            parmArr = [8, 76, 106];
            break;
        case 8:
            parmArr = [9, 76, 106];
            break;
        case 9:
            parmArr = [10, 127, 45];
            break;
        case 10:
            parmArr = [11, 432, 207];
            break;
        case 11:
            parmArr = [12, 70, 107];
            break;
        case 12:
            if (_num === 2) {
                parmArr = [14, -85, -85];
            } else {
                parmArr = [13, 70, 25];
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
            parmArr = [1, 146, 61];
            break;
        case 1:
            parmArr = [2, 225, 30];
            break;
        case 2:
            parmArr = [3, 364, 7];
            break;
        case 3:
            parmArr = [4, 392, 7];
            break;
        case 4:
            parmArr = [5, 66, 108];
            break;
        case 5:
            if (_num==2) {
                parmArr = [7, -85, -85];
            }
            else{
                parmArr = [6, 320, 204];
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
            parmArr = [1, 146, 61];
            break;
        case 1:
            parmArr = [2, 240, 32];
            break;
        case 2:
            parmArr = [3, 205, 205];
            break;
        case 3:
            parmArr = [4, 148, 9];
            break;
        case 4:
            parmArr = [5, 222, 180];
            break;
        case 5:
            parmArr = [6, 370, 100];
            break;
        case 6:
            parmArr = [7, 420, 210];
            break;
        case 7:
            if (_num==3) {
                parmArr = [10, -85, -85];
            }
            else if (_num===2) {
                parmArr = [9, -85,-85];
            }else{
                parmArr = [8, 100, 106];
            }
            break;
        case 8:
            parmArr = [11, 420, 210];
            break;
        case 9:
                parmArr = [12, -85, -85];
        break;
        }
        pic_click_move(parmArr[0], parmArr[1], parmArr[2]);
    }

    //任务分屏步骤操作
    var theme_rwfp=function(index,num){
        var _num = !num ? 1 : num;
        var parmArr = [];
        switch (index) {
            case 0:
                parmArr = [1, 26, 161];
                break;
            case 1:
                switch(_num){
                    case 1:
                        parmArr = [2, 170, 106];
                    break;
                    case 2:
                        parmArr = [3, 420, 150];
                    break;
                }
                break;
            case 2:
                switch(_num){
                    case 1:
                        parmArr = [4, 242, 106];
                    break;
                }
                break;
            case 3:
                switch(_num){
                   case 1:
                        parmArr = [5, 242, 75];
                    break;
                    case 2:
                        parmArr = [6, 242, 106];
                    break;
                }
                break;
            case 4:
                switch(_num){
                   case 1:
                        parmArr = [7, 242, 106];
                    break;
                    case 2:
                        parmArr = [8, 242, 106];
                    break;
                }
                break;
            case 5:
                switch(_num){
                    case 1:
                        parmArr = [9, 242, 122];
                    break;
                    case 2:
                        parmArr = [10, -85, -85];
                    break;
                }
                break;
            }
        pic_click_move(parmArr[0], parmArr[1], parmArr[2]);
    }

    function swipeDown(){
        $("#swipe_btn").css({display: 'block'})
        .animate({top: '160px',opacity: '1'},300).delay(2000)
        .fadeOut()
        .animate({opacity:'0',top: '0px',left: '95px'},swipeDown);
    }
    function swipeHeight(){
        $("#bar_btn").css({display: 'block'})
        .animate({height: '180px',opacity: '1'},300).delay(2000)
        .fadeOut()
        .animate({opacity: '0',top: '0px',left: '95px',height: 0},swipeHeight);
    }
    //绑定下拉动作
    $("#phoneContent").on('click',"#bar_btn,#swipe_btn",function(){
        $(".click_trigger").trigger("click");
    });
//是否切换为导演模式第二部手机
function changePhoneBkImg(isChange){
    var $phone=$("#phone");
    if (isChange===true) {
        if (!$phone.hasClass('dyms')) {
            $("#phone").addClass('dyms');
        }
    }else{
        if ($phone.hasClass('dyms')) {
            $("#phone").removeClass('dyms');
        }
    }
}
});
