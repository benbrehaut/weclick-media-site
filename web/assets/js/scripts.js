$(function() {

	$(document).ready(bootstrap, scrollBootstrap);

	$(window).on('scroll load resize unload', function() {
		scrollBootstrap();
	});

	/**
	 * On ready bootstrap
	 */
	function bootstrap() {
		insightsFormValidation();
		blogCatFilter();
		caseStudiesScroll();
		popupPagesLoad();
		caseStudySelector();
		googleMap();
		siteHeaderTheme();

		/**
		* Touch Device Detection
		**/
		var isTouchDevice = 'ontouchstart' in document.documentElement;
		var html = $('html');

		if ( isTouchDevice ) {
			html.addClass('touch');
		}
		else {
			html.addClass('no-touch');
		}

		/**
		 * Lazy Loading Init
		 */
		$.extend($.lazyLoadXT, {
			edgeY:  500,
			forceLoad: true
		});

		/**
		 * Home Banner Animations
		 */
		$('.js-home-banner-text').each(function() {
			var ele = $(this);
			var eleHtml = ele.html();
			// ele.html('<span class="inner">'+ eleHtml + '</span>');
			var eleInner = ele.find('.js-home-banner-inner');
			var animationText = ele.data('animate-text') ? ele.data('animate-text') : false;
			var animationDelay = ele.data('animate-delay');
			eleInner.html('&nbsp;');

			// process the lines
			var eleCss = {
				marginTop: ele.css('margin-top'),
				marginRight: ele.css('margin-right'),
				marginBottom: ele.css('margin-bottom'),
				marginLeft: ele.css('margin-left'),
				paddingTop: ele.css('padding-top'),
				paddingRight: ele.css('padding-right'),
				paddingBottom: ele.css('padding-bottom'),
				paddingLeft: ele.css('padding-left')
			};

			var guides = '<span class="guide-top"></span><span class="guide-right"></span><span class="guide-bottom"></span><span class="guide-left"></span><span class="guide-line-height-1"></span>';
			var margins = '<span class="margins"><span class="margin-top" style="height: ' + eleCss.marginTop + '; line-height: ' + eleCss.marginTop + ';">' + eleCss.marginTop + '</span><span class="margin-right" style="width: ' + eleCss.marginRight + ';">' + eleCss.marginRight + '</span><span class="margin-bottom" style="height: ' + eleCss.marginBottom + '; line-height: ' + eleCss.marginBottom + ';">' + eleCss.marginBottom + '</span><span class="margin-left" style="width: ' + eleCss.marginLeft + ';">' + eleCss.marginLeft + '</span></span>';
			var paddings = '<span class="paddings"><span class="padding-top" style="height: ' + eleCss.paddingTop + '; line-height: ' + eleCss.paddingTop + ';">' + eleCss.paddingTop + '</span><span class="padding-right" style="width: ' + eleCss.paddingRight + ';">' + eleCss.paddingRight + '</span><span class="padding-bottom" style="height: ' + eleCss.paddingBottom + '; line-height: ' + eleCss.paddingBottom + ';">' + eleCss.paddingBottom + '</span><span class="padding-left" style="width: ' + eleCss.paddingLeft + ';">' + eleCss.paddingLeft + '</span></span>';
			ele.append('<span class="guides">' + guides + margins + paddings + '</span>');

			if (animationText) {
				var counter = 0;
				setTimeout(function() {
					for (var i = 0; i < animationText.length; i++) {
						var typing = setTimeout(function (y) {
							if (counter == 0) {
								eleInner.html(animationText.charAt(y));
							} else {
								eleInner.append(animationText.charAt(y));
							}
							counter++;
						}, i * 75, i);
					};
				}, animationDelay);
			}
		});

		$('.js-guide-text').each(function() {
			var ele = $(this);
			var eleHtml = ele.html();
			var eleInner = ele.find('.js-guide-text-inner');

			// process the lines
			var eleCss = {
				marginTop: ele.css('margin-top'),
				marginParentTop: ele.closest('.content-image').css('margin-top'),
				marginRight: ele.css('margin-right'),
				marginBottom: ele.css('margin-bottom'),
				marginLeft: ele.css('margin-left'),
				paddingTop: ele.css('padding-top'),
				paddingRight: ele.css('padding-right'),
				paddingBottom: ele.css('padding-bottom'),
				paddingLeft: ele.css('padding-left')
			};

			if (eleCss.marginTop == 0) {
				eleCss.marginTop = marginParentTop;
			}

			var guides = '<span class="guide-top"></span><span class="guide-right"></span><span class="guide-bottom"></span><span class="guide-left"></span><span class="guide-line-height-1"></span>';
			var margins = '<span class="margins"><span class="margin-top" style="height: ' + eleCss.marginTop + '; line-height: ' + eleCss.marginTop + ';">' + eleCss.marginTop + '</span><span class="margin-right" style="width: ' + eleCss.marginRight + ';">' + eleCss.marginRight + '</span><span class="margin-bottom" style="height: ' + eleCss.marginBottom + '; line-height: ' + eleCss.marginBottom + ';">' + eleCss.marginBottom + '</span><span class="margin-left" style="width: ' + eleCss.marginLeft + ';">' + eleCss.marginLeft + '</span></span>';
			var paddings = '<span class="paddings"><span class="padding-top" style="height: ' + eleCss.paddingTop + '; line-height: ' + eleCss.paddingTop + ';">' + eleCss.paddingTop + '</span><span class="padding-right" style="width: ' + eleCss.paddingRight + ';">' + eleCss.paddingRight + '</span><span class="padding-bottom" style="height: ' + eleCss.paddingBottom + '; line-height: ' + eleCss.paddingBottom + ';">' + eleCss.paddingBottom + '</span><span class="padding-left" style="width: ' + eleCss.paddingLeft + ';">' + eleCss.paddingLeft + '</span></span>';
			ele.append('<span class="guides--alt js-inview">' + guides + margins + paddings + '</span>');
		});

		/**
		 * Remove hiding of site navigation window
		 * This is because on first load, it shows the windows opening for some strange reason
		 */
		$(document).ready(function() {
			$('.js-site-navigation-window').removeAttr( 'style' );
		});

		/**
		 * Toggle Site Menu
		 */
		$('.js-toggle-menu').on('click', function() {
			$(this).toggleClass('is-active');
			$('body').toggleClass('site-nav--is-active');
			$('html').toggleClass('site-nav--is-active');

			if ( $(this).hasClass('is-active') ) {
				$(this).attr('aria-expanded', 'true');
				$('.js-site-navigation-window').attr('aria-hidden', 'false');
				$(this).attr('title', 'Close Site Navigation Menu');
				$('.js-site-navigation-window').focus();
			} else {
				$(this).attr('aria-expanded', 'false');
				$('.js-site-navigation-window').attr('aria-hidden', 'true');
				$(this).attr('title', 'Open Site Navigation Menu');
			}
		});

		/**
		 * Ajax Load Content
		 */
		$('.js-ajax-load-content').on('click', function(e) {
			e.preventDefault();
			var element = $(this);
			var urlClicked = $(this).attr('href');
			var urlSlug = $(this).data('slug');

			getPage(urlClicked, urlSlug);
		});

		/**
		 * Lightbox Active Class
		 * Toggles Lightbox active class when page is ready
		 */
		function popupPagesLoad() {
			$(document).ready(function() {
				$('.js-lightbox').addClass('is-active');
			})
		}

		/**
		 * Select Case Study
		 */
		function caseStudySelector() {
			var caseStudiesGroup = $('.js-case-study-group'),
					caseStudyInfo = '.js-case-study-info',
					caseStudySelect = '.js-select-case-study',
					caseStudyBg = '.js-case-study-background',
					activeClass = 'is-active';

			/**
			 * Select Case Study
			 */
			$('.js-select-case-study').on('click', function(e) {
				e.preventDefault();
				var caseStudyCliked = $(this).data('case-study');
	
				caseStudiesGroup.find('.is-active:not(img)').removeClass('is-active');
				caseStudiesGroup.find("[data-case-study='" + caseStudyCliked + "']").toggleClass('is-active');
			});

			/**
			 * Trigger case study carousel
			 */
			if ($(window).width() < 1065) {
				caseStudiesCarousel();
			}

			/**
			 * Case Studies Carousel
			 */
			function caseStudiesCarousel() {
				caseStudiesGroup.swipe({ 
					fingers:'all', 
					swipeLeft:  findNextCaseStudy, 
					swipeRight: findPrevCaseStudy, 
					allowPageScroll: "auto"
				});
	
				function findPrevCaseStudy() {
					// Dots
					caseStudiesGroup.find(".js-select-case-study.is-active").prev(caseStudySelect).toggleClass(activeClass);
					caseStudiesGroup.find(".js-select-case-study.is-active").next(caseStudySelect).removeClass(activeClass);
	
					// Content
					caseStudiesGroup.find(".js-case-study-info.is-active").prev(caseStudyInfo).toggleClass(activeClass);
					caseStudiesGroup.find(".js-case-study-info.is-active").next(caseStudyInfo).removeClass(activeClass);
	
					// Image
					caseStudiesGroup.find(".js-case-study-background.is-active").prev(caseStudyBg).toggleClass(activeClass);
					caseStudiesGroup.find(".js-case-study-background.is-active").next(caseStudyBg).removeClass(activeClass);
				}
	
				function findNextCaseStudy() {
					// Dots
					caseStudiesGroup.find(".js-select-case-study.is-active").next(caseStudySelect).toggleClass(activeClass);
					caseStudiesGroup.find(".js-select-case-study.is-active").prev(caseStudySelect).removeClass(activeClass);
	
					// Content
					caseStudiesGroup.find(".js-case-study-info.is-active").next(caseStudyInfo).toggleClass(activeClass);
					caseStudiesGroup.find(".js-case-study-info.is-active").prev(caseStudyInfo).removeClass(activeClass);
	
					// Image
					caseStudiesGroup.find(".js-case-study-background.is-active").next(caseStudyBg).toggleClass(activeClass);
					caseStudiesGroup.find(".js-case-study-background.is-active").prev(caseStudyBg).removeClass(activeClass);
				}
			}
		}

		/**
		 * Home Banner Scroll Down
		 */
		$('.js-home-scroll-down').on('click', function() {
      $('html, body').animate({
        scrollTop: $(".content-image").offset().top
      }, 600);
		});

		/**
		 * Site Navigation Form
		 */
		$('#js-navigation-form').submit(function(e) {
			e.preventDefault();
	
			$.post({
				url: '/',
				dataType: 'json',
				data: $(this).serialize(),
				success: function(response) {
					if (response.success) {
						$('.js-navigation-form-error').removeClass('is-active');
						$('.js-navigation-form-message').addClass('is-active');
					} else {
						$('#js-navigation-form').addClass('has-errors');
						$('.js-navigation-form-error').addClass('is-active');
					}
				},
				error: function(response) {
					console.warn(error);
				}
			});
		});

		/**
		 * Contact Form Component Form
		 */
		$('.js-contact-form').submit(function(e) {
			e.preventDefault();
	
			$.post({
				url: '/',
				dataType: 'json',
				data: $(this).serialize(),
				success: function(response) {
					if (response.success) {
						$('.js-contact-form-error').removeClass('is-active');
						$('.js-contact-form-message').addClass('is-active');
					} else {
						$('.js-contact-form').addClass('has-errors');
						$('.js-contact-form-error').addClass('is-active');
					}
				}
			});
		});

		/**
		 * Video Banner
		 */
		$('.js-video-play').on('click', function() {
			$(this).fadeToggle();
			var videoUrl = $(this).data('video-src');

			var vimeoOptions = {
				id: videoUrl,
				width: 640,
				autoplay: true,
				playsinline: false,
				title: false,
				color: '000C24'
			}

			var create = new Vimeo.Player('js-video', vimeoOptions);
		});

		/**
		 * Scroll to Comments Box
		 */
		$('#js-scroll-to-comment-box').on('click', function() {
      $('html, body').animate({
				scrollTop: $("#js-comment-box").offset().top
			}, 600);
		});

		/**
		 * Case Studies Scroll
		 * Uses mousewheel.js
		 */
		function caseStudiesScroll() {
			var wd = $(window).width();
			var itemCount = $('.js-case-studies-item').length;

			$('.js-case-studies-wrap').css('width', wd);
			$('.js-case-studies-item').css('width', wd / 5 + parseFloat('50'));
			// $('.js-case-studies-item').css('width', wd / itemCount + 150);
			// 100 / itemCount + 25% <- Pseudo
		}

		$('.js-case-studies-wrap').mousewheel(function(e, delta) {
			e.preventDefault();

			// Is disabled for touch devices
			if (!$('html').hasClass('touch')) {
				this.scrollLeft -= (delta * 1);
			}
		});

		/**
		 * Book Layout Scroll
		 */
		$('.js-to-book-section').on('click', function(e) {
			e.preventDefault();
			var section = $(this).data('section');

			$('html, body').stop(true, false).animate({
				scrollTop: $('#' + section).offset().top
			}, 600);
		});

		/**
		 * Insights Form Validation
		 */
		function insightsFormValidation() {
			var form = $('.js-insights-search'),
					searchField = $('.js-insights-search-field'),
					submitBtn = $('.js-insights-search-submit');

			searchField.on('keypress', function() {
				if (searchField.val() === '') {
					submitBtn.attr('disabled', true);
				} else {
					submitBtn.removeAttr('disabled');
				}
			});

			$('.js-insights-search').on('submit', function(e) {
				if (searchField.val() == '') {
					e.preventDefault();
					searchField.addClass('has-error');
				} else {
					searchField.removeClass('has-error');
				}
			});
		}

		/**
		 * Blog Category Filter
		 */
		function blogCatFilter() {
			$('.js-filter-article').on('click', function(e) {
				e.preventDefault();
				var element = $(this);
				var filter = $(this).attr('href');

				$('html, body').animate({
					scrollTop: $(".js-all-cats").offset().top
				}, 600);

				$('.js-load-articles').addClass('is-searching');
				$('.js-filter-article').removeClass('is-active');

				// Ajax query to get articles
				$.get({
					url: filter,
					dataType : 'html',
					data: {},
					success: function(resp) {
						// Update page
						document.title = $(resp).filter('title').text();
						$('.js-load-articles').removeClass('is-searching');
						element.addClass('is-active');

						// Update Articles
						$('.js-load-articles').html($(resp).find('.js-load-articles').html());

						// For some reason, adding the class straight away results in no transiton
						setTimeout(function() {
							$('.js-article').addClass('is-visible');
						}, '050');
					},
					error: function(resp) {
						console.error(resp);
						$('.js-load-articles').removeClass('is-searching');
						$('.js-load-articles').addClass('has-error');
						$('.js-load-articles').html('Im Sorry, but here has been an error. Please try again.')
					}
				})
			});
		}

		/**
		 * Page Ajax Transisitons
		 */
		function getPage(page, slug) {
			history.pushState(null, null, page);
			
			$.get({
				url: page,
				dataType : 'html',
				data: {},
				success: function(resp) {
					// Update page
					document.title = $(resp).filter('title').text();
					$('body').addClass('js-lightbox--is-open');
					$('html').addClass('js-lightbox--is-open');

					// Update Area
					$('.js-ajax-area').html($(resp).find('.js-page').html());

					// For some reason, adding the class straight away results in no transiton
					setTimeout(function() {
						$('.js-lightbox').addClass('is-active');
					}, '1');
					getNextPage();
				},
				error: function(resp) {
					console.error(resp);
				}
			});

			window.onpopstate = function() {
				$('.js-lightbox').removeClass('is-active');
				$('html').removeClass('js-lightbox--is-open');
				$('body').removeClass('js-lightbox--is-open');
			};
		}

		function getNextPage() {
			$('.js-lightbox-next').on('click', function(e) {
				e.preventDefault();
				var urlClicked = $(this).attr('href');
				$('.js-lightbox').removeClass('is-active');
	
				getPage(urlClicked);
			});
		}

		/**
		 * Insights Category Filter Menu
		 */
		$('.js-toggle-insights-filter-list').on('click', function() {
			$('.js-insights-cats-list').slideToggle('fast');
		});

		/**
		 * Book Layout Scrolldown
		 */
		var scrollDownBtn = $('.js-book-layout-scrolldown');
		
		// Hiding / Showing btn on scroll
		$(window).scroll(function() {
			if ($(this).scrollTop()) {
				scrollDownBtn.removeClass('is-showing');
			} else {
				scrollDownBtn.addClass('is-showing');
			}
		});

		/**
		 * InView Trigger
		 * Uses inview.js
		 */
		$('.js-inview').on('inview', function(event, isInView) {
			if (isInView) {
				$(this).addClass('is-visible');
			}
		});

		/**
		 * Google Maps
		 */
		function googleMap() {
			// Checking if google object is loaded, as script is only loaded if map component
			// is used
			if (typeof google === 'object' && typeof google.maps === 'object') {
				// Location
				var location = {lat: 50.724495, lng: -1.865633};

				// Icon
				var icon = '/assets/icons/map-marker.svg';
				
				// Map
				var map = new google.maps.Map(document.getElementById('js-google-map'), {
					center: location,
					zoom: 12,

					// Disables all UI components
					disableDefaultUI: false,

					// Terrain / Satellite View
					mapTypeControl: false,

					// Scale window
					scaleControl: false,
					
					// Zoom Control
					zoomControl: true,

					// Street View
					streetViewControl: false,

					// Rotate
					rotateControl: false,
					
					// Map Styles
					styles: [
						{
							"featureType":"water", 
							"elementType":"geometry", 
							"stylers":[{ "color": "#cccccc" },
							{ 
								"lightness": 17 
							}
						]},
						{ 
							"featureType":"landscape", 
							"elementType":"geometry", 
							"stylers":[{ 
								"color": "#e9e9e9" 
							},
							{ 
								"lightness": 20 
							}
						]},
						{ 
							"featureType":"road.highway", 
							"elementType":"geometry.fill", 
							"stylers":[{
								"color": "#ffffff"
							},
							{ 
								"lightness": 17
							}
						]},
						{
							"featureType":"road.highway",
							"elementType":"geometry.stroke",
							"stylers":[ {
								"color": "#ffffff"
							},
							{ 
								"lightness": 29
							},
							{
								"weight": 0.2
							}
						]},
						{
							"featureType":"road.arterial",
							"elementType":"geometry",
							"stylers":[ {
								"color": "#ffffff"
							},
							{ 
								"lightness": 18
							}
						]},
						{
							"featureType":"road.local",
							"elementType":"geometry",
							"stylers":[ {
								"color": "#ffffff"
							},
							{
								"lightness": 16
							}
						]},
						{
							"featureType":"poi",
							"elementType":"geometry",
							"stylers":[ {
								"color": "#f5f5f5"
							},
							{ 
								"lightness": 21 
							}
						]},
						{
							"featureType":"poi.park",
							"elementType":"geometry",
							"stylers":[ {
								"color": "#dedede"
							},
							{ 
								"lightness": 21 
							}
						]},
						{
							"elementType":"labels.text.stroke",
							"stylers":[ {
								"visibility": "on"
							},
							{ 
								"color": "#ffffff" 
							},
							{ 
								"lightness": 16
							}
						]},
						{
							"elementType":"labels.text.fill",
							"stylers":[ {
								"saturation": 36
							},
							{ 
								"color": "#333333"
							},
							{ 
								"lightness": 40
							}
						]},
						{
							"elementType":"labels.icon",
							"stylers":[ {
								"visibility": "off"
							}]
						},
						{
							"featureType":"transit",
							"elementType":"geometry",
							"stylers":[ {
								"color": "#f2f2f2"
							},
							{
								"lightness": 19 
							}
						]},
						{
							"featureType":"administrative",
							"elementType":"geometry.fill",
							"stylers":[ {
								"color": "#fefefe"
							},
							{ 
								"lightness": 20 
							}
						]},
						{
							"featureType":"administrative",
							"elementType":"geometry.stroke",
							"stylers":[ {
								"color": "#fefefe"
							},
							{ 
								"lightness": 17
							},
							{ 
								"weight": 1.2 
							}
						]}
					]
				});
				
				// Marker
				var marker = new google.maps.Marker({
					position: location,
					map: map,
					icon: icon
				});
			}
		}

		$.fn.isInViewport = function() {
			var elementTop = $(this).offset().top;
			var elementBottom = elementTop + $(this).outerHeight();
	
			var viewportTop = $(window).scrollTop();
			var viewportBottom = viewportTop + $(window).height();
	
			return elementBottom > viewportTop && elementTop < viewportBottom;
	};

		$(window).on('scroll', function(){
			var theme = $(this).data('header-colour');

			$('.js-component').each(function () {
				var theme = $(this).data('header-colour');

				if ( $(this).isInViewport() ) {
					if ( $('body').hasClass('light') ) {
						$('body').removeClass(light);
						$('body').addClass(theme);
					}
				}
			});
			$('.js-component').each(function() {
				// var theme = $(this).data('header-colour');
				// var top_of_element = $(this).offset().top;
				// var bottom_of_element = $(this).offset().top + $(this).outerHeight();
				// var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
				// var top_of_screen = $(window).scrollTop();
		
				// if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
				// 	if ( $('body').hasClass('light') ) {
				// 		$('body').removeClass('light')
				// 		$('body').addClass(theme);
				// 	} else if ($('body').hasClass('dark')) {
				// 		$('body').removeClass('dark')
				// 		$('body').addClass(theme);
				// 	}
				// } else {
				// 	// $('body').removeClass(theme);
				// }

				// var theme = $(this).data('header-colour');
				// var sticky = $(this).offset().top;

				// if ($(window).scrollTop() >= sticky) {
				// 	$('body').addClass(theme);
				// } else {
				// 	$('body').removeClass(theme);
				// }
			});
		});

		function siteHeaderTheme() {
			// var _offset = 85;
			// var _modules = $('.js-component');
			// _modules.each(function(a, b) {
			// 		var _module_rect = $(b).clientRect();
			// 		_module_rect_top = _module_rect.top - parseInt($(b).css('margin-top'));
			// 		var _module_top = _module_rect_top - window.pageYOffset - _offset;
			// 		var _module_height = _module_rect.height;
			// 		var _module_bottom = _module_rect_top + _module_height + parseInt($(b).css('margin-bottom')) - window.pageYOffset - _offset;
			// 		if (_module_top <= 0 && _module_bottom > 0) {
			// 				if ($(b).is('.has-dark-background') && 	 != 'dark-background') {
			// 						_new_background = 'dark-background';
			// 				} else if ($(b).is('.has-dark-light-background') && _last_background != 'dark-light-background') {
			// 						_new_background = 'dark-light-background';
			// 				} else if ($(b).is('.has-light-dark-background') && _last_background != 'light-dark-background') {
			// 						_new_background = 'light-dark-background';
			// 				} else if (!$(b).is('.has-dark-background') && !$(b).is('.has-dark-light-background') && !$(b).is('.has-light-dark-background') && _last_background != 'light-background') {
			// 						_new_background = 'light-background';
			// 				}
			// 				if (_new_background != _last_background) {
			// 						$('body').removeClass('light-background dark-background dark-light-background light-dark-background').addClass(_new_background);
			// 						_last_background = _new_background;
			// 				}
			// 		}
			// });
		}
	}

	/**
	 * Scrolling Bootstrap
	 */
	function scrollBootstrap() {
		siteHeaderScroll();
		bookLayoutImageSwap();
		// siteHeaderTheme();

		/**
		 * Site Header 
		 */
		function siteHeaderScroll() {
			var wd = $(window);
			var height = wd.height();
			var scroll = wd.scrollTop();
			var scrollDepth;
			var toggleClass = 'site-header--is-showing'

			if ($('body').hasClass('home')) {
				scrollDepth = height
			} else if ($('body').hasClass('blog')) {
				scrollDepth = 850
			} else {
				scrollDepth = 580
			}

			if (scroll >= scrollDepth) {
				$(".js-site-header").addClass(toggleClass);
			} else {
				$(".js-site-header").removeClass(toggleClass);
			}
		}

		/**
		 * Book Layout Image Swapping
		 * Swaps the left image when the user scrolls down
		 */
		function bookLayoutImageSwap() {
			var wd = $(window);
		
			var vp = {
				top : wd.scrollTop(),
				left : wd.scrollLeft()
			};
			
			$('.js-book-layout-content').each(function() {
				var offset = $(this).offset();
				var section = $(this).attr('ID');
				
				if ((wd.height() + vp.top) >= offset.top+(wd.height()/2)) {
					$(this).prev('.js-book-layout-sidebar').addClass('is-active');
					$('.js-to-book-section').removeClass('is-active');
					$(this).closest('.js-book-layout').find('.js-to-book-section[data-section="'+ section +'"]').addClass('is-active');
				} else {
					$(this).prev('.js-book-layout-sidebar').removeClass('is-active');
					$(this).closest('.js-book-layout').find('.js-to-book-section[data-section="'+ section +'"]').removeClass('is-active');
				}
			});
		}

		function siteHeaderTheme() {
			var wd = $(window);
		
			var vp = {
				top : wd.scrollTop(),
				left : wd.scrollLeft()
			};
			
			$('.home-banner').each(function() {
				var offset = $(this).offset();

				if ((wd.height() + vp.top) >= offset.top+(wd.height()/2)) {
					console.log('hello');
				}
			});
		}
	}

});