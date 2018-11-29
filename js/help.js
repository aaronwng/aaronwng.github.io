function helper_isScrolledIntoView(elem, showPercent, exceptElement) {
        var $elem = $(elem);
        var $window = $(window);
        var exceptTopView = 0;
        var exceptBottomView = 0;
        if (exceptElement) {
            if (exceptElement.top) {
                exceptTopView = $(exceptElement.top).height();
            }
            if (exceptElement.bottom) {
                exceptBottomView = $(exceptElement.bottom).height();
            }
        }


        // console.log(exceptTopView); 
        var docViewTop = $window.scrollTop();
        var viewTop = $window.scrollTop() + exceptTopView;
        var viewBottom = docViewTop + $window.height() - exceptBottomView;

        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.height();

        var elemShow1 = viewBottom - elemTop;
        var elemShow2 = elemBottom - viewTop;
        if (elemShow1 < 0 || elemShow2 < 0) {
            return false;
        }

        var topOk = (elemShow1 / $elem.height()) >= showPercent ? true : false;
        var bottomOk = (elemShow2 / $elem.height()) >= showPercent ? true : false;
        return topOk || bottomOk;
    };