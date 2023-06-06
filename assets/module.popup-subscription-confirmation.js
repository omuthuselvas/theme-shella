(function($){

    'use strict';

    theme.PopupSubscriptionСonfirmation = function() {

        function PopupSubscriptionСonfirmation() {
            this.settings = {
                popup_subscription_name: 'subscription-confirmation',
                popup_contact_name: 'contact-confirmation'
            };
    
            this.load();
        };
        
        PopupSubscriptionСonfirmation.prototype = $.extend({}, PopupSubscriptionСonfirmation.prototype, {
            load: function() {
                var $error = $('.js-subscription-confirmation-error'),
                    $popup;
                
                if(window.location.href.indexOf('customer_posted=true') !== -1 || window.location.href.indexOf('contact%5Btags%5D=newsletter&form_type=customer') !== -1) {
                    theme.Popups.callByName(this.settings.popup_subscription_name);
    
                    theme.Popups.addHandler(this.settings.popup_subscription_name, 'close.after', function () {
                        var newurl = window.location.href.replace('?customer_posted=true', '').replace('customer_posted=true', '');
    
                        window.history.replaceState({path: newurl}, '', newurl);
                    });
                } else if(window.location.href.indexOf('contact_posted=true') !== -1) {
                    theme.Popups.callByName(this.settings.popup_contact_name);
    
                    theme.Popups.addHandler(this.settings.popup_contact_name, 'close.after', function () {
                        var newurl = window.location.href.replace('?contact_posted=true', '').replace('contact_posted=true', '');
    
                        window.history.replaceState({path: newurl}, '', newurl);
                    });
                } else if($error.length) {
                    $popup = theme.Popups.getByName(this.settings.popup_name);
                    
                    $popup.find('[data-popup-confirmation-success]').addClass('d-none');
                    $popup.find('[data-popup-confirmation-error-message]').html($error.first().html());
                    $popup.find('[data-popup-confirmation-error]').removeClass('d-none');
    
                    theme.Popups.callByName(this.settings.popup_name);
                }
            }
        });
    
        theme.PopupSubscriptionСonfirmation = new PopupSubscriptionСonfirmation;
    };
    
    $(function() {
        theme.PopupSubscriptionСonfirmation();
    });
})(jQueryTheme);