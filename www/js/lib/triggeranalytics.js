define(['ga'], function () {
    // analytics number goes here
    window.ga('create', 'UA-45546538-1');
    return function () {
        //this gets done everytime we load a new page
        window.ga('send', 'pageview');
    };
});
