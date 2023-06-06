(function($){

    'use strict';

    theme.CarouselReviews = (function() {

        function CarouselReviews(container) {
            this.$container = $(container);
    
            //var sectionId = this.$container.attr('data-section-id');
    
            //this.settings = {};
    
            this.namespace = '.carousel-reviews';
    
            this.onLoad();
        };
    
        CarouselReviews.prototype = $.extend({}, Section.prototype, CarouselReviews.prototype, {
            onLoad: function() {
                var $carousel = this.$container.find('[data-js-carousel]'),
                    $slick = $carousel.find('[data-js-carousel-slick]');
    
                if($slick.length) {
                    var $prev = $carousel.find('[data-js-carousel-prev]'),
                        $next = $carousel.find('[data-js-carousel-next]'),
                        count = $carousel.attr('data-count'),
                        autoplay = $carousel.attr('data-autoplay') === 'true' ? true : false,
                        speed = +$carousel.attr('data-speed'),
                        infinite = $carousel.attr('data-infinite') === 'true' ? true : false,
                        arrows = $carousel.attr('data-arrows') === 'true' ? true : false,
                        bullets = false;
    
                    this.$slick = $slick;
    
                    function slidesHeight() {
                        var $slides = $carousel.find('.carousel-reviews__item_content');
    
                        $slides.css({
                            'min-height': ''
                        });
    
                        $slides.css({
                            'min-height': $carousel.find('.slick-track').height()
                        });
                    };
    
                    $slick.on('init', function() {
                        $window.trigger('checkImages');
    
                        slidesHeight();
    
                        $carousel.removeClass('invisible');
    
                        theme.Loader.unset($carousel.parent());
                    });
    
                    $slick.on('afterChange', function(event, slick, currentSlide, nextSlide){
                        $window.trigger('checkImages');
                    });
    
                    $window.on('theme.resize', function () {
                        slidesHeight();
                    });
    
                    $slick.slick({
                        lazyLoad: false,
                        arrows: arrows,
                        prevArrow: $prev,
                        nextArrow: $next,
                        dots: bullets,
                        dotsClass: 'slick-dots d-flex flex-wrap flex-center list-unstyled mt-35',
                        adaptiveHeight: true,
                        autoplay: autoplay,
                        autoplaySpeed: speed,
                        infinite: true,
                        slidesToShow: count,
                        slidesToScroll: 1,
                        rtl: theme.rtl,
                        responsive: [
                            {
                                breakpoint: theme.breakpoints.values.xl,
                                settings: {
                                    slidesToShow: Math.min(3, count),
                                    slidesToScroll: 1
                                }
                            },
                            {
                                breakpoint: theme.breakpoints.values.lg,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            },
                            {
                                breakpoint: theme.breakpoints.values.sm,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }
                        ]
                    });
                }
            },
            onUnload: function() {
                this.$container.off(this.namespace);
    
                if(this.$slick) {
                    this.$slick.slick('destroy').off();
                    this.$slick = null;
    
                    $window.unbind('theme.resize.carousel-reviews');
                }
            }
        });
    
        return CarouselReviews;
    })();
    
    $(function() {
        theme.sections.register('carousel-reviews', theme.CarouselReviews);
    });
})(jQueryTheme);