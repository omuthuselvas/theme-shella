(function($){

	'use strict';

	theme.HomeBuilder = (function() {

		function HomeBuilder(container) {
			var _ = this;
	
			this.$container = $(container);
	
			//var sectionId = this.$container.attr('data-section-id');
	
			//this.settings = {};
	
			this.namespace = '.home-builder';
	
			this.onLoad();
	
			this.$container.on('section:reload', function () {
				_.onUnload();
				_.onLoad();
			});
		};
	
		HomeBuilder.prototype = $.extend({}, Section.prototype, HomeBuilder.prototype, {
			onLoad: function() {
				var _ = this,
					$slider = this.$container.find('.rev_slider'),
					$slider_02 = this.$container.find('.slider'),
					$instafeed = this.$container.find('#instafeed'),
					$promobox = this.$container.find('.promobox'),
					$parallax = $promobox.find('.js-parallax');
	
				this.initRevolution($slider);
	
				this.initSlick($slider_02);
	
				if($parallax.length && theme.Parallax) {
					theme.Parallax.init($parallax);
				}
	
				if($instafeed.length) {
					this.initInstafeed($instafeed);
				}
			},
			initSlick: function ($slider) {
				var _ = this;
	
				$slider.each(function() {
					var $this = $(this),
						$slick = $this.find('[data-js-slider-slick]'),
						$prev = $this.find('[data-js-slider-prev]'),
						$next = $this.find('[data-js-slider-next]'),
						speed = +$slick.attr('data-speed') * 1000,
						arrows = $slick.attr('data-arrows') === 'true' ? true : false,
						bullets = $slick.attr('data-bullets') === 'true' ? true : false;
	
					_.$slick = $slick;
	
					$slick.on('init', function() {
						$slick.removeClass('invisible');
	
						theme.Loader.unset($slick.parent());
					});
	
					$slick.slick({
						lazyLoad: false,
						arrows: arrows,
						prevArrow: $prev,
						nextArrow: $next,
						dots: bullets,
						dotsClass: 'slick-dots d-none d-lg-flex flex-wrap flex-center position-absolute list-unstyled mt-35',
						adaptiveHeight: true,
						autoplay: true,
						autoplaySpeed: speed,
						fade: true,
						infinite: true,
						slidesToShow: 1,
						slidesToScroll: 1,
						rtl: theme.rtl
					});
				});
			},
			initRevolution: function ($slider) {
				var _ = this;
	
				$slider.each(function () {
					var $this = $(this),
						gridwidth = $this.data('gridwidth').split(','),
						gridheight = $this.data('gridheight').split(','),
						minheight = $this.data('minheight'),
						slider_layout = $this.data('slider-layout'),
						full_screen_offset_container = $this.data('full-screen-offset-container') || null;
	
					var revapi = $this.show().revolution({
						sliderLayout: slider_layout,
						fullScreenOffsetContainer: full_screen_offset_container,
						responsiveLevels: [1259, 1024, 777, 540],
						gridwidth: [+gridwidth[0], +gridwidth[1], +gridwidth[2], +gridwidth[3]],
						gridheight: [+gridheight[0], +gridheight[1], +gridheight[2], +gridheight[3]],
						minHeight: minheight !== undefined ? minheight : false,
						visibilityLevels:[1259, 1024, 777, 540],
						delay: $this.data('delay') * 1000,
						disableProgressBar: 'on',
						lazyType: 'single',
						spinner: 'none',
						navigation: {
							arrows: {
								enable: $this.data('arrows'),
								style: 'uranus',
								hide_onleave: false
							},
							bullets: {
								enable: $this.data('bullets'),
								h_align: 'center',
								v_align: 'bottom',
								h_offset: 0,
								v_offset: 74,
								space: 24,
								hide_onleave: false,
								tmp: ''
							},
							touch: {
								touchenabled: 'on'
							}
						},
						parallax: {
							type: 'mouse',
							origo: 'slidercenter',
							speed: 400,
							levels: [2,4,6,8,10,12,14,16,18,20,25,30,35,40,45,50],
							disable_onmobile: 'on'
						}
					});
	
					_.$container.one('section.unload', function () {
						revapi.revkill();
					});
				});
			},
			initInstafeed: function ($instafeed) {
				var $template = $instafeed.find('template');
	
				if(!$template.length || !$template[0].content) {
					return;
				}
	
				var template = $($instafeed.find('template')[0].content).children().html(),
					tag = $instafeed.data('tag'),
					limit = $instafeed.data('limit'),
					instafeed_obj = {},
					sizes_obj = {
						'240': 1,
						'320': 2,
						'480': 3,
						'640': 4
					},
					size = $instafeed.data('size') || '240';
	
				$instafeed.html('');
	
				if(tag) {
					instafeed_obj.tag = tag;
				} else {
					instafeed_obj.username = $instafeed.data('username');
				}
	
				$.instagramFeed($.extend(instafeed_obj, {
					'container': "#instafeed",
					'display_profile': false,
					'display_biography': false,
					'display_gallery': true,
					'styling': false,
					'items': limit,
					'items_per_row': 4,
					'margin': 0.5,
					'get_data': true,
					'callback': function (data) {
						var obj = tag ? data.edge_hashtag_to_media : data.edge_owner_to_timeline_media,
							i = 0;
						
						for(; i < Math.min(limit, obj.edges.length); i++) {
							var html = template.replace(/post-image/g, obj.edges[i].node.thumbnail_resources[sizes_obj[size]].src)
								.replace(/post-link/g, 'https://www.instagram.com/p/' + obj.edges[i].node.shortcode)
								.replace(/post-comments/g, obj.edges[i].node.edge_media_to_comment.count)
								.replace(/post-likes/g, obj.edges[i].node.edge_media_preview_like.count);
	
							$instafeed.html($instafeed.html() + html);
						};
	
						$instafeed.removeClass('d-none');
	
						theme.ImagesLazyLoad.update();
					}
				}));
			},
			onUnload: function() {
				this.$container.off(this.namespace);
	
				this.$container.trigger('section.unload');
	
				if(this.$slick) {
					this.$slick.slick('destroy').off();
					$window.unbind('load.slickResize');
					this.$slick = null;
				}
	
				if(theme.Parallax) {
					theme.Parallax.destroy(this.$container.find('.js-parallax'));
				}
			}
		});
	
		return HomeBuilder;
	})();
	
	$(function() {
		theme.sections.register('home-builder', theme.HomeBuilder);
		theme.sections.register('collection-fullwidth-head', theme.HomeBuilder);
		theme.sections.register('collection-head', theme.HomeBuilder);
	});
})(jQueryTheme);