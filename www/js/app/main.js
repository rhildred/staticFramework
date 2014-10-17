define(["jquery", "jquery.footer", "jquery.nav", "bootstrap"], function() {
    //the jquery.nav.js and jquery.footer.js plugins have been loaded.
    jQuery(function() {
        jQuery("#nav").nav();
        jQuery('#footer').footer();
        // we set this hidden in the CSS so that the page refresh can now be from top to bottom
        jQuery('body').show();

    });
});
