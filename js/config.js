(function(){
    "use strict";

    requirejs.config({
        "baseUrl": '/js/vendor',
        "paths": {
            "module": "../modules",
            "jquery": "jquery-1.10.2.min"
        },
        "shim": {
            "jquery.colpick": [ "jquery"]
        }
    });

    require(['/js/embedInlineEditor.js'])
})();
