/*****************************
*login Mask show
*****************************/
var GLOBAL={
	indexPage:{}
};
;(function($){
	var $blur=$('.blur-anchor');
	var $showMask=$('.JS_mask-show');
	var showMask=function(e){
		console.log(1);
		$blur.hasClass('filter-blur')||$blur.addClass('filter-blur');
		$showMask.hasClass('bs_hidden')&&$showMask.removeClass('bs_hidden');
	    e&&e.preventDefault();
	}
	var hideMask=function(e){
		$blur.hasClass('filter-blur')&&$blur.removeClass('filter-blur');
		$showMask.hasClass('bs_hidden')||$showMask.addClass('bs_hidden');
		e&&e.preventDefault();
	}
	$.extend({CTO:{showMask:showMask,hideMask:hideMask}});
})(jQuery);

GLOBAL.indexPage.Init=function (){
	$('.btn-cancel').on('click',$.CTO.hideMask);
	$('.JS_LogIn').on('click',$.CTO.showMask);
}
$(document).ready(function(){
	GLOBAL.indexPage.Init();
	var $othersProfile=$(".JS_Others-Profl");
	var $profile=$(".JS_Profl");
	function switchToOthers(){
		$othersProfile.hasClass('bs_hidden')&&$othersProfile.removeClass('bs_hidden');
		$profile.hasClass('bs_hidden')||$profile.addClass('bs_hidden');
	}
	function switchToSelf(){
		$profile.hasClass('bs_hidden')&&$profile.removeClass('bs_hidden');
		$othersProfile.hasClass('bs_hidden')||$othersProfile.addClass('bs_hidden');
	}
	$(".li-img").on('click',switchToOthers);
	$(".nav-home").on('click',switchToSelf);
	$(".JS_Post-RollBox").on('click',function(){
		$('.JS_Post-RollBox').addClass("bs_hidden");
		$('.JS_Post-Box').removeClass('bs_hidden');
	});
	$(".postBtn").on('click',function(e){
		$('.JS_Post-RollBox').removeClass("bs_hidden");
		$('.JS_Post-Box').addClass('bs_hidden');
		e&&e.preventDefault();
	});
	$('.JS_Cmt').on('click',function(e){
		var $cmtWrap=$('.append-cmtWrap');
		var hide=$cmtWrap.hasClass("bs_hidden");
		if (hide) {
			$cmtWrap.removeClass("bs_hidden");
		}else{
			$cmtWrap.addClass("bs_hidden");
		}
		e&&e.preventDefault();
	})
	$('.cmt-pullBack').on('click',function(){
				var $cmtWrap=$('.append-cmtWrap');
		$cmtWrap.addClass("bs_hidden");
	})
	$('.backToTop').on('click',function(e){
		$(window).scrollTop(0);
		e&&e.preventDefault();
	})

	$('.title-topic').on('click',function(e){
		$('.ct-twTxt').css({'height':'auto'});
		e&&e.preventDefault();
	})
	$('.nav-user').on('click',function(e){
		$('.middle-Proflie').removeClass('bs_hidden');
		$('.middle-home').addClass('bs_hidden');
		$('.nav-user').addClass('active');
				$('.nav-home').removeClass('active');

		e.preventDefault();
	})
	$('.nav-home').on('click',function(e){
		$('.middle-Proflie').addClass('bs_hidden');
		$('.middle-home').removeClass('bs_hidden');
		$('.nav-home').addClass('active');
				$('.nav-user').removeClass('active');

		e.preventDefault();
	})
	var scrollEvent=function(){
			var scrollTop=$(window).scrollTop();
			if (scrollTop<=50) {
				var height=100-scrollTop;
				var top=30-scrollTop/2;
				$(".head").css({'height':height});
				$(".leftLogo").css({'top':top});
			}
	}
	$(window).on('scroll',scrollEvent);
});