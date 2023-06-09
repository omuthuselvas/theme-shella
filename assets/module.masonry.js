(function($){

    'use strict';

    theme.Masonry = function() {

        function Masonry() {
            jQueryBridget('masonry', window.Masonry, $);
            
            this.load();
        };
    
        Masonry.prototype = $.extend({}, Masonry.prototype, {
            load: function() {
                this.init();
            },
            init: function (is_first) {
                var _ = this,
                    $masonry = $('.masonry'),
                    params = {
                        itemSelector: '[class*="col-"]'
                    };
    
                this.$masonry = $masonry;
    
                function load() {
                    $masonry.masonry(params).removeClass('invisible');
    
                    setTimeout(function () {
                        _.update();
                    }, 100);
                };
    
                load();
    
                if(!is_first) {
                    $window.on('load', function () {
                        $masonry.masonry('layout');
                    });
                }
            },
            update: function () {
                this.$masonry.masonry('layout');
            },
            destroy: function () {
                this.$masonry.masonry('destroy');
            }
        });
    
        theme.Masonry = new Masonry;
    };
    
    $(function() {
        theme.Masonry();
    });
})(jQueryTheme);