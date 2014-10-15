define(["jquery", "underscore", "text!../../footer.html"], function(jQuery, _, sFooter) {
  jQuery.fn.footer = function() {
      var fTemplate = _.template(sFooter);
      return this.html(fTemplate({}));
  };
});
