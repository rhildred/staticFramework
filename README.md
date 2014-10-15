Example of using require.js to load jQuery from a CDN and to load a nav.html and footer.html
====

This example ([demo here](https://rhildred.github.io/staticFramework/www)) shows one way to load jQuery and jQuery plugins with require.js. In this example, we have modified the plugins to be wrapped in a `define()`, rather than using the [shim configuration](http://requirejs.org/docs/api.html#config-shim). If you'd like to see how to load jQuery plugins that do not call define, without modifying the source, see the [example with shim config](http://github.com/requirejs/example-jquery-shim/)

In this example, we set the *path* of jQuery to point to a google-hosted CDN. That can benefit users, who might already have the file in their browser cache, and therefore don't have to download it again.

Please note that in order to be able to load an asset from a CDN in the built files, all the plugins that needs that asset as a dependency have to call `define()`.

**If you want IE6-8 support**, clone this repo, but replace the jQuery file with a jQuery 1.X release. The jQuery 2 used in this project does not work with those browsers, a 1.X release is needed. Modify the jQuery path in [app.js](https://github.com/requirejs/example-jquery-cdn/blob/master/www/js/app.js#L9), to for example `//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min`

###Project structure

tools/

- build.js
- r.js

www/app.html

www/js/

- app.js
- lib/
    - jquery.alpha.js
    - jquery.beta.js
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
      "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);
```

App/main.js is where the app logic is:

```javascript
define(["jquery", "jquery.alpha", "jquery.beta"], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        $('body').alpha().beta();
    });
});
```

###How to see it in action

You can see the [demo in action here](https://rhildred.github.io/staticFramework/www). To use it yourself, simply check out the code. Replace the index.html, about.html, contact.html with your own pages, making sure that you have the require.js script tag and the #nav and #footer placeholder divs. Then replace the nav.html and the footer.html with your own markup.

