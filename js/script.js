var Global;

Global = {

  /*数字动画时长 */
  numAnimate: {
    duration: 1000,
    interval: 0
  }
};

$(function() {

  /*topNav InterAct
   */
  $('.siteMapList>li').on('click', function() {
    var $this, hide;
    $this = $(this);
    hide = $this.hasClass('active');
    if (hide) {
      $this.removeClass('active');
    } else {
      $this.addClass('active');
    }
  });

  /*banner ScrollDown */
  (function() {

    /*bannerChange */
    var numberChange, scrollEvent;
    $('.Js-dotChange>li').on('click', function() {
      var $this, selectOrder;
      $this = $(this);
      $('.Js-dotChange>li').removeClass('active');
      $this.hasClass('active') || $this.addClass('active');
      selectOrder = $this.attr('data-order');
      $('.backImgList').animate({
        top: -100 * (selectOrder - 1) + '%'
      }, 500);
    });
    $('.Js-scrollDown').on('click', function() {
      var currentIndex, dot, height;
      dot = '.Js-dotChange>li';
      currentIndex = $(dot + '.active').attr('data-order');
      if (currentIndex * 1 === $(dot).length * 1) {
        height = $('.siteNavMain').height();
        $('html,body').animate({
          scrollTop: height
        }, 500);
      } else {
        $('.Js-dotChange>li[data-order=' + (currentIndex * 1 + 1) + ']').trigger('click');
      }
    });

    /*number ANIMATION */
    numberChange = function() {
      $('.Js-MaskAnimate').hasClass('animate') || $('.Js-MaskAnimate').addClass('animate').animate({
        opacity: 0
      }, 500, 1000);
      if (numberChange.prepared) {
        console.log(numberChange.count++);
        $('.animateNumber').each(function(index) {
          var $this, num;
          $this = $(this);
          num = ($this.attr('data-to') / 24 * numberChange.count).toFixed(0);
          $this.text(num);
        });
        if (numberChange.count >= 24) {
          clearInterval(Global.numAnimate.interval);
        }
      }
    };
    numberChange.count = 0;
    numberChange.prepared = true;
    scrollEvent = function() {
      var fn, scrollToView;
      scrollToView = helper_isScrolledIntoView('.brandWrap', .5);
      if (scrollToView) {
        fn = function() {
          return Global.numAnimate.interval = setInterval(numberChange, Global.numAnimate.duration / 24);
        };
        $(window).off('scroll', scrollEvent);
        setTimeout(fn, 500);
      }
    };
    if ($('.brandWrap').length) {
      $(window).on('scroll', scrollEvent);

      /*animate */
      $(window).on('scroll', function() {
        if (helper_isScrolledIntoView('.brandWrap', 0.5)) {
          $('.Js-MaskAnimate').hasClass('animate') || $('.Js-MaskAnimate').addClass('animate');
        } else {
          $('.Js-MaskAnimate').removeClass('animate');
        }
      });
    }
  })();

  /* advantage Tab */
  (function() {
    var show;
    show = function(index, ctrl) {
      $('.Js-lstCtrl' + ctrl + ' li').removeClass('active');
      $('.Js-lstCtrl' + ctrl + ' li[data-order=' + index + ']').addClass('active');
      if (ctrl - 1 === 0) {
        $('.iconGroup li').removeClass('active');
        $('.iconGroup li[data-order=' + index + ']').addClass('active');
      }
      return $('.Js-lstCtrl' + ctrl).animate({
        left: -100 * (index - 1) + '%'
      }, 500);
    };
    $('.iconGroup li').on('click', function() {
      var $this, index;
      $this = $(this);
      index = $this.attr('data-order');
      show(index, 1);
    });
    $('.preBtn').on('click', function() {
      var ctrlIndex, currentIndex;
      ctrlIndex = $(this).attr('data-ctrl');
      currentIndex = $('.Js-lstCtrl' + ctrlIndex + ' li.active').attr('data-order');

      /*if been first one ,return */
      if (currentIndex <= '1') {
        $(this).animate({
          'opacity': '0.2'
        }, 200).animate({
          'opacity': '1'
        }, 200);
        return;
      }
      show(currentIndex - 1, ctrlIndex);
    });
    $('.nextBtn').on('click', function() {
      var ctrlIndex, currentIndex;
      ctrlIndex = $(this).attr('data-ctrl');
      currentIndex = $('.Js-lstCtrl' + ctrlIndex + ' li.active').attr('data-order');

      /*if been first one ,return */
      if (currentIndex >= $('.Js-lstCtrl' + ctrlIndex + ' li').length) {
        $(this).animate({
          'opacity': '0.2'
        }, 200).animate({
          'opacity': '1'
        }, 200);
        return;
      }
      show(currentIndex * 1 + 1, ctrlIndex);
    });
  })();

  /*ScrollToTop Func */
  (function() {
    var hideFixedNav;
    $('.JS-scrollTop').on('click', function() {
      $('html,body').animate({
        scrollTop: 0
      }, 500);
    });
    $('.qrcode').hover(function() {
      $('.qrCodeBig').css({
        'visibility': 'visible'
      });
    }).mouseout(function() {
      $('.qrCodeBig').css({
        'visibility': 'hidden'
      });

      /*show or hide FixedNav */
    });
    hideFixedNav = function() {
      var $fixedNav, topNavHeight, windowTop;
      topNavHeight = $('.siteNavMain').height();
      windowTop = $(window).scrollTop();
      $fixedNav = $('.rightNavWrap');
      if (windowTop >= topNavHeight) {
        return $fixedNav.show();
      } else {
        return $fixedNav.hide();
      }
    };
    hideFixedNav();
    $(window).on('scroll', function() {
      return hideFixedNav();
    });
    if ($('.clients .topBanner').length) {

      /*Clients backScroll */
      $(window).on('scroll', function() {
        var topDistance;
        if (helper_isScrolledIntoView('.clients .topBanner', 0.5)) {
          topDistance = $(window).scrollTop() - $('.clients .topBanner').offset().top;
          $('.clients .topBannerFixed').css({
            top: topDistance / 2 + 'px'
          });
          return console.log('clients:' + topDistance);
        }
      });
    }
  })();
});
