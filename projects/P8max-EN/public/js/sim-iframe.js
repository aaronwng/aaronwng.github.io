/**
*@desc: local optimize
*@date: 2015/2/25
*@author: Youlion
*/
document.domain = "huawei.com";
$(document).ready(function(){
	var f = $(window.parent.document).find("#simulator");
	setFrameHeight(f);
	function setFrameHeight(f){
		f.height($("body").height());
	};
	$(window).resize(function() {
		setFrameHeight(f);
	});
});