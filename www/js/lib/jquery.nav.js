function setActive(page) {
    jQuery(".active").removeClass("active");
    if (page == "index.html" || page == "" || page == ".") {
        jQuery('a[href$="."]').parent().addClass("active");
    } else {
        jQuery('a[href$="' + page + '"]').parent().addClass("active");
    }
}

define(["jquery", "text!../../nav.html", "history"], function (jQuery, sNav) {
    jQuery.fn.nav = function () {
        var path = window.location.pathname;
        var page = path.split("/").pop();
        this.html(sNav);
        setActive(page);

        // we are clicking on navbar and want to set the history
        jQuery(".navbar a:not(.dropdown-toggle)").click(function (evt) {
            var sPage = evt.currentTarget.href.split("/").pop();
            var sTitle = evt.currentTarget.title;
            if (sPage == "index.html" || sPage == "")
                sPage = ".";
            History.pushState({
                state: sPage
            }, sTitle, sPage);
            return false;
        });

        // history has changed either as a result of clicking or the back button
        History.Adapter.bind(window, 'statechange', function () { // Note: We are using statechange instead of popstate
            var State = History.getState(); // Note: We are using History.getState() instead of event.state
            var sPage = State.cleanUrl.split("/").pop();
            setActive(sPage);
            var sUrl = sPage + " #content";
            jQuery("#content").load(sUrl);
        });

        return this;
    };
});
