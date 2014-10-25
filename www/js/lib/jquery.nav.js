define(["text!../../nav.html", "jquery", "underscore", "history", "bootstrap"], function (sNav) {


    function Navigator(oParams) {
        jQuery.extend(this, {
            init: function (oParams) {
                //constructor stuff ... we come into initial page
                jQuery.extend(this, oParams);
                var fTemplate = _.template(this.sNav);
                this.oDiv.html(fTemplate({}));
                var sPage = this.path.split("/").pop();
                this.setActive(sPage);
                // we are clicking on navbar and want to set the history
                this.oDiv.find("a:not(.dropdown-toggle)").click(jQuery.proxy(this.menuClick, this));

                // we get subsequent pages from the back button or from clicking above
                History.Adapter.bind(window, 'statechange', jQuery.proxy(this.stateChange, this));
                if(sPage == "")sPage = "index.html";
                require([sPage], function(page){
                    if(typeof page !== 'undefined') page();
                });
            },
            path: window.location.pathname,
            setActive: function (sPage) {
                jQuery(".navbar .active").removeClass("active");
                if (sPage == "index.html" || sPage == "" || sPage == ".") {
                    jQuery('a[href$="."]').parent().addClass("active");
                } else {
                    jQuery('a[href$="' + sPage + '"]').parent().addClass("active");
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
            // history has changed either as a result of clicking or the back button
            stateChange: function () {
                if (this.bInBind) return;
                this.bInBind = true;
                var State = History.getState(); // Note: We are using History.getState() instead of event.state
                var sPage = State.cleanUrl.split("/").pop();
                this.setActive(sPage);
                var sUrl = sPage + " #content";
                jQuery("#content").load(sUrl, jQuery.proxy(this.pageRetrieved, this));
            },
            pageRetrieved: function (sHtml) {
                var sTitle = sHtml.match(/<title[^>]*>([^<]+)<\/title>/)[1];
                var sPage = History.getState().cleanUrl.split("/").pop();
                // need to set title
                History.replaceState({
                    state: sPage
                }, sTitle, sPage);
                this.bInBind = false;
                if(sPage == ".")sPage = "index.html";
                 require([sPage], function(page){
                     if(typeof page !== 'undefined') page();
                });

            }

        });
        this.init(oParams);
        return this;
    }

    jQuery.fn.nav = function () {
        new Navigator({
            sNav: sNav,
            oDiv: this
        });
        return this;
    };
});
