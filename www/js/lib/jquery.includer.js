define(["jquery", "underscore"], function (jQuery) {
    jQuery.fn.includer = function () {
        for (var n = 0; n < this.length; n++) {
            jQuery.ajax({
                url: this[n].id + ".html",
                async: false,
                success: function (sTemplate) {
                    var fTemplate = _.template(sTemplate);
                    var sSelector = '#' + this.url.replace(".html", "");
                    jQuery(sSelector).html(fTemplate({}));
                    jQuery(sSelector + " div[data-role='include']").includer();
                },
                error: function (xHr, sText) {
                    console.log(sText);
                }
            });
        }
        return this;
    };
});
