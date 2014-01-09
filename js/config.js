(function(){
    "use strict";

    require.config({
        "baseUrl": '/js/vendor',
        "paths": {
            "module": "../modules",
            "jquery": "jquery-1.10.2.min"
        },
        "shim": {
            "jquery.colpick": [ "jquery"],
            "underscore": {
                exports: "_"
            }
        }
    });

    require(['/js/embedInlineEditor.js'])
})();
