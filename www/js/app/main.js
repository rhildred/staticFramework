define(["jquery", "jquery.includer", "jquery.nav", "bootstrap"], function() {
    //the jquery.nav.js and jquery.footer.js plugins have been loaded.
    jQuery(function() {
        jQuery.ajaxSetup({crossDomain: true, xhrFields: { withCredentials: true } });
        jQuery("div[data-role='include']").includer();
        jQuery("#nav").nav();
        // we set this hidden in the CSS so that the page refresh can now be from top to bottom
        jQuery('body').show();

    });
});
