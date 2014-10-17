function Navigator(oParams){
    jQuery.extend(this, {
        init: function(oParams){
            //constructor stuff ... we come into initial page
            jQuery.extend(this, oParams);
            var page = this.path.split("/").pop();
            var fTemplate = _.template(this.sNav);
            this.oDiv.html(fTemplate({}));
            this.setActive(page);
            jQuery(".carousel").carousel();
            // we are clicking on navbar and want to set the history
            this.oDiv.find("a:not(.dropdown-toggle)").click(jQuery.proxy(this.menuClick, this));

            // we get subsequent pages from the back button or from clicking above
            History.Adapter.bind(window, 'statechange', jQuery.proxy(this.stateChange, this));
        },
        path: window.location.pathname,
        setActive: function (page) {
            jQuery(".navbar .active").removeClass("active");
            if (page == "index.html" || page == "" || page == ".") {
                jQuery('a[href$="."]').parent().addClass("active");
            } else {
                jQuery('a[href$="' + page + '"]').parent().addClass("active");
            }
        },
        menuClick: function (evt) {
            var sPage = evt.currentTarget.href.split("/").pop();
            if (sPage == "index.html" || sPage == "")
                sPage = ".";
            History.pushState({
                state: sPage
            }, "", sPage);
            return false;
        },
        // we need to know if we are in a replace state or a push state
        bInBind: false,
        sPage: null,
        // history has changed either as a result of clicking or the back button
        stateChange: function () {
            if (this.bInBind) return;
            this.bInBind = true;
            var State = History.getState(); // Note: We are using History.getState() instead of event.state
            this.sPage = State.cleanUrl.split("/").pop();
            this.setActive(this.sPage);
            var sUrl = this.sPage + " #content";
            jQuery("#content").load(sUrl, jQuery.proxy(this.pageRetrieved, this));
        },
        pageRetrieved: function (sHtml) {
            var sTitle = sHtml.match(/<title[^>]*>([^<]+)<\/title>/)[1];
            History.replaceState({
                state: this.sPage
            }, sTitle, this.sPage);
            this.bInBind = false;
            jQuery(".carousel").carousel();
        }

    });
    this.init(oParams);
    return this;
}

define(["jquery", "text!../../nav.html", "underscore", "history"], function (jQuery, sNav) {
    jQuery.fn.nav = function () {
        new Navigator({
            sNav: sNav,
            oDiv: this
        });
        return this;
    };
});
