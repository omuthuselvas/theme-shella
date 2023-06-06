(function($){

    'use strict';
    
    theme.ButtonsBlocksVisibility = function() {
    
        function ButtonsBlocksVisibility() {
            this.selectors = {
                buttons: '.js-button-block-visibility'
            };
    
            this.load();
        };
    
        ButtonsBlocksVisibility.prototype = $.extend({}, ButtonsBlocksVisibility.prototype, {
            load: function() {
                $('[data-block-visibility]').each(function () {
                    var $this = $(this),
                        name = $this.attr('data-block-visibility');
    
                    if(window.location.href.indexOf(name) != -1) {
                        $this.removeClass('d-none-important');
    
                        $this.find('[data-block-visibility-focus]').focus();
                    }
                });
    
                $body.on('click', this.selectors.buttons, function (e) {
                    var $this = $(this),
                        name = $this.attr('data-block-link'),
                        $block = $('[data-block-visibility="' + name + '"]');
    
                    if(!$block.length) {
                        return;
                    }
    
                    var close_popup = $this.attr('data-action-close-popup');
    
                    if($block.attr('data-block-animate') === 'true') {
                        $block.velocity('stop', true).removeAttr('style');
    
                        if($block.hasClass('d-none-important')) {
                            $block.velocity('stop', true).removeAttr('style');
    
                            $block.velocity('slideDown', {
                                duration: theme.animations.dropdown.duration * 1000,
                                begin: function () {
                                    $block.removeClass('d-none-important');
                                    $this.addClass('open');
                                },
                                complete: function () {
                                    $block.removeAttr('style');
                                }
                            });
                        } else {
                            $block.velocity('slideUp', {
                                duration: theme.animations.dropdown.duration * 1000,
                                begin: function () {
    
                                },
                                complete: function () {
                                    $block.addClass('d-none-important').removeAttr('style');
                                    $this.removeClass('open');
                                }
                            });
                        }
                    } else {
                        $block[$this.attr('data-action') === 'close' ? 'addClass' : $this.attr('data-action') === 'open' ? 'removeClass' : 'toggleClass']('d-none-important');
                    }
    
                    function scrollToBlock() {
                        if(!$block.hasClass('d-none-important') || $this.attr('data-action') === 'open') {
                            if($block[0].hasAttribute('data-block-onscroll')) {
                                var block_t = $block.offset().top,
                                    header_h = theme.StickyHeader && theme.StickyHeader.$sticky ? theme.StickyHeader.$sticky.stickyHeader('getStickyHeight') : 0;
    
                                $('html, body').velocity( 'scroll' , {
                                    offset: block_t - header_h,
                                    duration: 300
                                });
                            }
                        }
                    };
    
                    if(close_popup) {
                        theme.Popups.closeByName(close_popup, null, function () {
                            scrollToBlock();
                        });
                    } else {
                        scrollToBlock();
                    }
    
                    if(!$block.hasClass('d-none-important')) {
                        $block.find('[data-block-visibility-focus]').focus();
                    }
    
                    e.preventDefault();
                    return false;
                });
            }
        });
    
        theme.ButtonsBlocksVisibility = new ButtonsBlocksVisibility;
    };
    
    $(function() {
        theme.ButtonsBlocksVisibility();
    });
})(jQueryTheme);