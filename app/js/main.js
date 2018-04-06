$(document).ready( function() {

	var tabletWidth = 900;
	var mobileWidth = 420;
	var blackout = $(".blackout");

	//fixed nav
	
	var nav = $('.header_nav');	
	var logo = $('.header_logo');
	var headerBottom = $('.header').offset().top + $('.header').height();

	//nav for desktop
		if ($(window).scrollTop() >= headerBottom - $(nav).height()) {
			if ($(window).width() > tabletWidth) {
				$(nav).addClass('header_nav__fixed');
			} else {
				$(nav).removeClass('header_nav__fixed');
			}
		}
	
		$(window).scroll(function() {
			if ($(window).width() > tabletWidth) {
				if ($(window).scrollTop() >= headerBottom - $(nav).height()) {
					$(nav).addClass('header_nav__fixed');
				} else {
					$(nav).removeClass('header_nav__fixed');
				}
			} else {
				$(nav).removeClass('header_nav__fixed');
			}
		});
		
		$(window).scroll(function() {
			if ($(window).width() > tabletWidth) {
				var wScroll = $(window).scrollTop();
				if ((wScroll >= $('.price').offset().top - $(nav).height()) && (	wScroll < $('.gallery	').	offset().top - $(nav).height())) {
					$('.header_nav').css('background-color', '#dcedc8');
				} else {
					$('.header_nav').css('background-color', '#fff');
				}
			} else {
				$('.header_nav').css('background-color', '#fff');
			}
		});

	// //form showing
	var moltingBtn = $(".service_molting-link");
	var moltingClose = $(".molting_close");
	var moltingBlock = $(".molting");
	var connectForm = $(".connect");
	var connectClose = $(".connect_close");
	var connectCall = 	$('.call_connect_form');

	$(moltingBtn).on('click', function(e) {
		e.preventDefault();
		blackout.css('display', 'block');
		moltingBlock.css('display', 'block');
		$(document.body).addClass('stop-scrolling');
	});

	connectCall.on('click', function(e) {
		e.preventDefault();
		blackout.css('display', 'block');
		connectForm.css('display', 'block');
		$(document.body).addClass('stop-scrolling');
	});

	function closeForm(form) {
		blackout.css('display', 'none');
		form.css('display', 'none');
		$(document.body).removeClass('stop-scrolling');
	}

	moltingClose.on('click', function(e) {
		closeForm(moltingBlock);
	});

	connectClose.on('click', function(e) {
		closeForm(connectForm);
	});


	$(window).keydown(function(e){
  	if (moltingBlock.css('display') == 'block') {
			if (e.keyCode == 27) {
				closeForm(moltingBlock);
			}
		}
		if (connectForm.css('display') == 'block') {
			if (e.keyCode == 27) {
				closeForm(connectForm);
			}
		}

  });

  $(blackout).on('click', function(e) {
		if (moltingBlock.css('display') == 'block') {
			closeForm(moltingBlock);
		}
		if (connectForm.css('display') == 'block') {
			closeForm(connectForm);
		}
	});

	//Check active-status during scrolling the page
	var navLinks = $('.header_item');
	
	function checkStatus() {
		var wScroll = $(window).scrollTop();
		checkPosition('header');
		checkPosition('about');
		checkPosition('service');
		checkPosition('price');
		checkPosition('gallery');
	}
	
	function checkPosition(element) {
		var wScroll = $(window).scrollTop();
		if (wScroll >= $('.' + element).offset().top - 90 && wScroll < $('.' + 	element).offset().top + $('.' + element).height()) {
				$(navLinks).removeClass('active');
				$('.' + element + '-link').addClass('active');
		}
	}
	
	checkStatus();
	
	$(window).scroll(function() {
		checkStatus();
	});
	
	// scrolling to page-element 
	var navList = $('.header_list');
	$(nav).on('click', function(e) {
		e.preventDefault();
		var targ = e.target;
		if (targ.tagName != 'A') return;
		if ($(targ).hasClass('header_logo')) return;
		if ($(targ).hasClass('header_item__connect')) return;
			var goal = targ.dataset.link;
			moveToElement(goal);
	});
	
	function moveToElement(elem) {
		var target = $('.' + elem);
		var targetPosition = elem == 'header' ? 0 : target.offset().top - 89;

		if($(window).width() < tabletWidth) {
			var targetPosition = elem == 'header' ? 0 : target.offset().top;
		}

		$('html, body').animate({scrollTop: '' + targetPosition}, 800);
	}

	//hide background 
	$(window).scroll(function() {
		var wScroll = $(window).scrollTop();
		if (wScroll > $('.gallery').offset().top) {
			$('.promo_back').css('display', 'none');
		} else {
			$('.promo_back').css('display', 'block');
		}
	});

	//Hamburger
	//mobile-navigation 
	$('.toggler').on('click', function(e){
		if ($(window).width() <= tabletWidth) {
			$('.header_list').toggleClass('header_list__opened');
			$(this).find('.toggler_hamburger').toggleClass('toggler_hamburger__open');
			$(this).find('.toggler_cross').toggleClass('toggler_cross__open');
		}
		});

		$('.header_list').on('click', function(e){
			if ($(window).width() <= tabletWidth) {
				if (e.target.tagName != 'A') return;
				$('.header_list').removeClass('header_list__opened');
				$('.toggler_hamburger').toggleClass('toggler_hamburger__open');
				$('.toggler_cross').toggleClass('toggler_cross__open');
			}
		});

	
	//click to service (in mobile-mod) button for showing service-list
	$('.service_header').on('click', function(e) {
		if ($(window).width() <= mobileWidth) {
			var statusList = $(this).closest('.service_block').find('.service_list').css('height');
			var toggler = $(this).find('.service_close');
			$(this).closest('.service_block').find('.service_list').toggleClass('service_list__opened');
			console.log(statusList);
			if (statusList == '0px') {
				$(toggler).text('-');
			} else {
				$(toggler).text('+');
			}
		}
	});

	//go up footer button
	$('.footer_up').on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 800);
	});


});