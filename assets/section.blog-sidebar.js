(function($){

    'use strict';

        theme.BlogSidebar = (function() {
    
        function BlogSidebar(container) {
            this.$container = $(container);
    
            //var sectionId = this.$container.attr('data-section-id');
    
            //this.settings = {};
    
            this.namespace = '.blog-sidebar';
    
            this.onLoad();
        };
    
        BlogSidebar.prototype = $.extend({}, Section.prototype, BlogSidebar.prototype, {
            onLoad: function() {
                if(theme.StickySidebar) {
                    theme.StickySidebar.init(this.$container, true);
                }
            },
            onUnload: function() {
                this.$container.off(this.namespace);
    
                if(theme.StickySidebar) {
                    theme.StickySidebar.destroy(this.$container);
                }
            }
        });
    
        return BlogSidebar;
    })();
    
    $(function() {
        theme.sections.register('blog-sidebar', theme.BlogSidebar);
    });
})(jQueryTheme);
