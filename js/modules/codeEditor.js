/*
 * codeEditor.js
 * Copyright (C) 2013  <@TJFDFS>
 *
 * Distributed under terms of the MIT license.
 */

define(['underscore', 'module/ultis'], function( _, ultis){
    /*
     * Display matching style
     */
    function displayMatchingStyle(matchingStyle) {
        // Rearrange matchingstyle, use filename as key
        var matchingStyleByFileName = [];
        _.each(matchingStyle, function(arr, selector){
            _.each(arr, function(o, i){
                var filepath;
                for(key in o){
                    if(key !== "order" && key !== "privilege")
                        filepath = key;
                }
                matchingStyleByFileName.push({
                    selector: selector,
                    filepath: filepath,
                    privilege: o['privilege'],
                    order: o['order'],
                    style: o[filepath]
                });
            });
        });
        /* Sort matchingStyle according privilege */
        var sortedMatchingStyle = _.sortBy(matchingStyleByFileName, function(o){
            return o.privilege + '_' + o.order;
        });
        var styleHtml = "<ul>"
        _.each(sortedMatchingStyle, function(o, i){
            styleHtml += "<li><span class='selector'>" + o.selector + "</span><span class='filepath'>" + o.filepath +"</span><div class='style'>" + o.style + "</div></li>";
        });
        styleHtml += "</ul>"
        $('#embed-inline-editor-area').children('.coder').html(styleHtml);
    }

    return {
        'displayMatchingStyle': displayMatchingStyle
    }
});
