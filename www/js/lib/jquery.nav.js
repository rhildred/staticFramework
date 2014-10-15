function setActive(page) {
    jQuery(".active").removeClass("active");
    if (page == "index.html" || page == "" || page == ".") {
        jQuery('a[href$="."]').parent().addClass("active");
    } else {
        jQuery('a[href$="' + page + '"]').parent().addClass("active");
    }
}

define(["jquery", "text!../../nav.html", "underscore", "history"], function (jQuery, sNav, _) {
    jQuery.fn.nav = function () {
        var path = window.location.pathname;
        var page = path.split("/").pop();
        var fTemplate = _.template(sNav);
        this.html(fTemplate({}));
        setActive(page);


        // we are clicking on navbar and want to set the history
        jQuery(".navbar a:not(.dropdown-toggle)").click(function (evt) {
            var sPage = evt.currentTarget.href.split("/").pop();
            if (sPage == "index.html" || sPage == "")
                sPage = ".";
            History.pushState({
                state: sPage
            }, "", sPage);
            return false;
        });

        // we need to know if we are in a replace state or a push state
        var bInBind = false;
        // history has changed either as a result of clicking or the back button
        History.Adapter.bind(window, 'statechange', function () { // Note: We are using statechange instead of popstate
            if(bInBind)return;
            bInBind = true;
            var State = History.getState(); // Note: We are using History.getState() instead of event.state
            var sPage = State.cleanUrl.split("/").pop();
            setActive(sPage);
            var sUrl = sPage + " #content";
            jQuery("#content").load(sUrl, function(sHtml){
                var sTitle = sHtml.match(/<title[^>]*>([^<]+)<\/title>/)[1];
                History.replaceState({state:sPage}, sTitle, sPage);
                bInBind = false;
            });
        });

        return this;
    };
});
