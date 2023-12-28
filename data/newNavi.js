$(function() {
	// 카테고리 전체보기 팝업 띄우기 20211022 추가
	var listBtn = $('.openLayerPopup');
	
	$(listBtn).click(function() {
		var $self = $(this);
		var $target = $($(this).attr('href'));
		$target.attr('tabindex', '0').show().focus();
		$('.mask').show();
		$target.find('.close_popup').click(function() {
			$target.hide();
			$('.mask').hide();
			$self.focus();
			$(this).off('click');
		});
	}); // 팝업 포커싱
	
	// 위치정보 20210826 추가
	$('.loca_select_wrapper').each(function () {
		$(this).bind('mouseover focusin', function() {
			$(this).find('.loca_select').addClass('open');
		});
		
		$(this).bind('mouseout focusout', function() {
			$(this).find('.loca_select').removeClass('open');
		});
	});
	
	// 로그인 정보 및 메인메뉴
	$('.loginKdata').classtoggle({
		'button': '.active'
	});
	
	$('#gnb1').gnb1();
	$('#gnb2').gnb2();
	
	$('.related .group').classtoggle({
		'button': '.label'
	});
});

$.fn.gnb1 = function(options) {
	var settings = $.extend({
		'actionType': 'mouseover focusin',
		'target'    : '#nHeader',
		'class'     : 'active',
		'depth2'    : '.submenu',
		'closeBtn'  : '.close'
	}, options);
	
	return this.each(function() {
		var $selecter = $(this);
		
		$selecter.find('a').on(settings.actionType, function() {
			if( $(this).parent('li').hasClass('active') == false ) {
				$(this).parent('li').addClass('active');
				$(this).parent('li').siblings('li').removeClass('active');
				
				$(this).parents('li').addClass('active');
				$(this).parents('li').siblings('li').removeClass('active');
				
				if( settings.target != '' ) {
					$(settings.target).addClass(settings.class);
				}
			}
			
			if( settings.actionType == 'click' ) {
				if( $(this).next('*').length > 0 ) {
					return false;
				}
			}
		});
		
		if( $selecter.find(settings.closeBtn).length == 1 ) {
			$selecter.find(settings.closeBtn).on('click', function() {
				$selecter.find('li').removeClass(settings.class);
				$(settings.target).removeClass(settings.class);
				
				return false;
			});
		} else {
			$(document).on('mousemove', function(e) {
				cursorY = e.pageY;
				
				if( $selecter.find('li.active').length > 0 ) {
					if( cursorY > parseInt($selecter.find(settings.depth2).offset().top + $selecter.find('.active').find(settings.depth2).height()) ) {
						setTimeout(function() {
							$selecter.find('li').removeClass(settings.class);
							$(settings.target).removeClass(settings.class);
						}, 200);
					}
				}
			});
			
			$('#wrap').on('mouseover focusin', 'a', function() {
				if( $(window).width() > 1280 ) {
					if( $(this).parents('#gnb1').length == 0 ) {
						setTimeout(function() {
							$selecter.find('li').removeClass(settings.class);
							$(settings.target).removeClass(settings.class);
						}, 200);
					}
				}
			});
		}
		
		$selecter.find('a:last').keydown(function(e) {
			if( e.keyCode === 9 ) {
				$selecter.find('li').removeClass(settings.class);
				$(settings.target).removeClass(settings.class);
			}
		});
	});
};

$.fn.gnb2 = function(options) {
	var settings = $.extend({
		'btnOpen'         : '.open',
		'btnClose'        : '.close',
		'classAdd'        : '#nHeader',
		'className'       : 'active',
		'siblings'        : true,
		'responsive'      : true,
		'responsiveWidth' : '1280'
	}, options);
	
	return this.each(function() {
		var $selecter = $(this);
		
		$selecter.find(settings.btnOpen).on('click', function() {
			if( $selecter.find(settings.btnClose).length > 0 ) {
				$(settings.classAdd).addClass(settings.className);
				$('#targetMenu').attr('tabindex','1');
				$('#targetMenu1').focus();
			} else {
				if( $(settings.classAdd).hasClass(settings.className) == false ) {
					$(settings.classAdd).addClass(settings.className);
				} else {
					$(settings.classAdd).removeClass(settings.className);
				}
				$(settings.classAdd).find('.open').focus();
			}
			
			return false;
		});
		
		if( $selecter.find(settings.btnClose).length > 0 ) {
			$selecter.find(settings.btnClose).on('focusin click', function() {
				$(settings.classAdd).removeClass(settings.className);
				$('#targetMenu').removeAttr('tabindex');
				$(settings.classAdd).find('.open').focus();
				return false;
			});
		}
		
		function menuAction($this) {
			if( $this.next('*').length > 0 && $this.next('*').css('display') != 'none' ) {
				if( $this.parent('li').hasClass('active') == false ) {
					$this.parent('li').addClass('active');
				} else {
					$this.parent('li').removeClass('active');
				}
				
				event.preventDefault();
			}
		}
		
		$selecter.find('li a').on('click', function(e) {
			if( settings.responsive == true ) {
				if( $(window).width() <= settings.responsiveWidth ) {
					menuAction($(this));
				}
			} else {
				menuAction($(this));
			}
		});
	});
};

$.fn.classtoggle = function(options) {
	var settings = $.extend({
		'button'       : '.open',
		'action'       : 'click',
		'classname'    : 'active',
		'accordion'    : false,
		'respond'      : false,
		'respondWidth' : '768',
		'close'        : '.close'
	}, options);
	
	return this.each(function() {
		var $selecter = $(this);
		
		function clickActive() {
			if( $selecter.hasClass(settings.classname) == false ) {
				$selecter.addClass(settings.classname);
				
				if( settings.accordion == true ) {
					$selecter.siblings().removeClass(settings.classname);
				}
			} else {
				if( $selecter.find(settings.close).length == 0 ) {
					$selecter.removeClass(settings.classname);
				}
			}
		}
		
		if( settings.action == 'click' ) {
			$selecter.find(settings.button).on(settings.action, function() {
				if( settings.respond == false ) {
					clickActive();
					
					return false;
				} else {
					if( $(window).width() <= settings.respondWidth ) {
						clickActive();
						
						return false;
					} else {
						$selecter.find(settings.button).off();
					}
				}
			});
		} else {
			if( $selecter.find(settings.close).length > 0 ) {
				$selecter.find(settings.button).on({
					mouseenter: function() {
						$selecter.addClass(settings.classname);
						
						if( settings.accordion == true ) {
							$selecter.siblings().removeClass(settings.classname);
						}
					},
					focusin: function() {
						$selecter.addClass(settings.classname);
					},
					click: function() {
						return false;
					}
				});
			} else {
				$selecter.find(settings.button).on({
					mouseenter: function() {
						$selecter.addClass(settings.classname);
					},
					focusin: function() {
						$selecter.addClass(settings.classname);
					},
					mouseleave: function() {
						$selecter.removeClass(settings.classname);
					},
					focusout: function() {
						$selecter.removeClass(settings.classname);
					}
				});
			}
		}
		
		if( $selecter.find(settings.close).length > 0 ) {
			$selecter.find(settings.close).on('click', function() {
				$selecter.removeClass(settings.classname);
				
				return false;
			});
		} else {
			if( settings.accordion == false ) {
				$selecter.find('a:last').keydown(function(e) {
					if( e.keyCode === 9 ) {
						$selecter.removeClass(settings.classname);
					}
				});
				
				$selecter.find('a:first').keydown(function(e) {
					if( e.keyCode === 9 && e.shiftKey ) {
						$selecter.removeClass(settings.classname);
					}
				});
			}
		}
	});
};