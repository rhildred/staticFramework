Example of using require.js to load jQuery from a CDN and to load a nav.html and footer.html
====

This example ([demo here](https://rhildred.github.io/staticFramework/www)) shows a simple templating system with  jQuery and jQuery plugins and require.js.

In this example, we set the *path* of jQuery to point to a google-hosted CDN. That can benefit users, who might already have the file in their browser cache, and therefore don't have to download it again.

Please note that in order to be able to load an asset from a CDN in the built files, all the plugins that needs that asset as a dependency have to call `define()`.

**If you want IE6-8 support**, clone this repo, but replace the jQuery file with a jQuery 1.X release. The jQuery 2 used in this project does not work with those browsers, a 1.X release is needed. Modify the jQuery path in [app.js](https://github.com/requirejs/example-jquery-cdn/blob/master/www/js/app.js#L9), to for example `//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min`

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

