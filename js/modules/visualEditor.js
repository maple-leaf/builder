/*
 * visualEditor.js
 * Copyright (C) 2013  <@TJFDFS>
 *
 * Distributed under terms of the MIT license.
 */

define(['jquery', 'jquery.colpick'], function($){
    // Colorpicker init
    $('.embed-inline-editor-colorpicker').colpick({
        colorScheme: 'dark',
        layout: 'rgbhex',
        color: 'ff8800',
        flat: true,
        onSubmit: function (hsb, hex, rgb, el) {
            $(el).css('background-color','#'+hex);
            $(el).colpickHide();
        },
        onBeforeShow: function(el){
        },
        onShow: function (el) {
            $(el).css({'position':'absolute','left':'10','top':'0'});
        },
        onHide: function (el) {
        }
    }).css('background-color', '#ff8800');
    $('.embed-inline-editor-colorpicker').children('.colpick').css('display','none');
    $('.embed-inline-editor-colorpicker').click(function(e){
        if(!$(e.target).hasClass('colpick_submit'))
            $(this).colpickShow();
    });
});
