Javascript Code behind
====

This example ([demo here](https://rhildred.github.io/staticFramework/www)) shows a simple declarative templating system with  jQuery and jQuery plugins and require.js.

Each "page" like about.html and contact.html can have a contact.html.js script behind that gets loaded when the page is loaded into the dom. In this case index.html.js loads a twitter bootstrap carousel and contact.js.html loads a google map. The google map was [configured here.](http://www.trivoo.net/google-maps/)

###Project structure


www/

- index.html
- about.html
- contact.html
- nav.html
- footer.html

www/js/

- app.js
- lib/
    - jquery.footer.js
    - jquery.nav.js
    - require.js
    - text.js
    - async.js
    - index.html.js
    - contact.html.js
- app/
    - main.js

###How it's set up
The main file of this setup is www/js/app.js. It is loaded from app.html by this line:
```html
<script data-main="js/app" src="js/lib/require.js"></script>
```

App.js is mainly about path configuration. We point out the special paths to our app code, and to the google CDN for jQuery. Finally, our main code is loaded at the bottom of the file:

```javascript
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app",
      "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
      "bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
      "history": "//cdnjs.cloudflare.com/ajax/libs/history.js/1.8/bundled-uncompressed/html4+html5/jquery.history",
      "underscore": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min"

    }
});

// Load the main app module to start the app
requirejs(["app/main"]);
```

App/main.js is where the app logic is:

```javascript
define(["jquery", "jquery.footer", "jquery.nav"], function(jQuery) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    jQuery(function() {
        jQuery("#nav").nav();
        jQuery('#footer').footer();
    });
});
```

###How to see it in action

You can see the [demo in action here](https://rhildred.github.io/staticFramework/www). To use it yourself, simply check out the code. Replace the index.html, about.html, contact.html with your own pages, making sure that you have the require.js script tag and the #nav and #footer placeholder divs. Then replace the nav.html and the footer.html with your own markup.

Note
----

This was [based on this requirejs example](https://github.com/requirejs/example-jquery-cdn).

