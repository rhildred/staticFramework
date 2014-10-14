define(["jquery", "jquery.footer", "jquery.nav", "bootstrap"], function(jQuery) {
    //the jquery.nav.js and jquery.footer.js plugins have been loaded.
    jQuery(function() {
        jQuery("#nav").nav();
        jQuery('#footer').footer();
    });
});
