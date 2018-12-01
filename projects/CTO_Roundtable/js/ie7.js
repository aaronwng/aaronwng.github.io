/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'HuaWeiCTOIcon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-star_hollow': '&#xe601;',
		'icon-email': '&#xe600;',
		'icon-arrow-down': '&#xe60b;',
		'icon-component': '&#xe60c;',
		'icon-friend': '&#xe60d;',
		'icon-group': '&#xe60e;',
		'icon-house': '&#xe60f;',
		'icon-HW': '&#xe610;',
		'icon-location': '&#xe611;',
		'icon-msg': '&#xe612;',
		'icon-search': '&#xe613;',
		'icon-star': '&#xe614;',
		'icon-barChart': '&#xe615;',
		'icon-upToTop': '&#xe616;',
		'icon-user': '&#xe617;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
