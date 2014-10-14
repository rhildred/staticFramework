define(["jquery"], function(jQuery) {
  jQuery.fn.footer = function() {
      var dYear = new Date();
      return this.html('<hr/>&copy; Rich Hildred ' + dYear.getFullYear());
  };
});
