define(function(require){
    var $ = require('jquery'),
    ultis = require('module/ultis'),
    fileIO = require('module/fileIO'),
    visualEditor = require('module/visualEditor'),
    codeEditor = require('module/codeEditor');

    $(function () {
        // Add a position-fixed handler
        var editorHtml ='<div id="embed-inline-editor-handler"> <style scoped id="embed-inline-editor-style"> #embed-inline-editor-handler { background-color: goldenrod; width: 40px; height: 40px; position: fixed; bottom: 40px; right: 0px;} </style></div> <div id="embed-inline-editor"> Can\'t connect to Server</div>';
        var styleMapping = {};
        var ajaxQueue = [];
        $('body').append(editorHtml);

        // Init editor
        $('body').on('click','#embed-inline-editor-handler',function(){
            embedInlineEditorInit();
            $('#embed-inline-editor').css('display','block');
            $('link').each(function () {
                console.log($(this).attr('href'));
                if (this.href.indexOf('css') !== -1) {
                    ajaxQueue.push($(this).attr('href'));
                }
            });
            // Create style json mapping
            styleMapping = ultis.createStyleMapping(ajaxQueue);
            $("#embed-inline-editor-ajax-loading").hide();

            $('body').children().not('#embed-inline-editor-handler, #embed-inline-editor, script, style').bind('click',function (e) {
                e.preventDefault();
            }).bind('mousedown', function (e) {
                e.preventDefault();
                if(e.which === 1){
                    //TODO: someplace involed with other js function will make event not response here
                    var domTree = ultis.getDomTreeOfTargetNode(e.target, 3);
                    var html = "<ul>";
                    $.each(domTree.parents, function (key, value) {
                        html += "<li><a href='javascript:;'>" + value + "</a><span>&gt;</span></li>";
                    });
                    html += "</ul>"
                    $('#target-ele-parents').html(html);
                    $('#target-ele-current').html(domTree.current + "<span>&gt;</span>");
                    var html = "<ul>";
                    $.each(domTree.childs, function (key, value) {
                        html += "<li><a href='javascript:;'>" + value + "</a><span>|</span></li>";
                    });
                    html += "</ul>"
                    $('#target-ele-childs').html(html);

                    var matchingStyle = ultis.getMatchingStyle(e.target, styleMapping);
                    if($('#embed-inline-editor-area .coder').is(':visible')){
                        console.log(matchingStyle);
                        codeEditor.displayMatchingStyle(matchingStyle);
                    }
                }
            });
        });

        // editor Robot start

        function embedInlineEditorInit(){
            // Get HTML structure
            $.ajax('/embedInlineEditor.html').success(function(html){
                $('#embed-inline-editor').html(html);
                $('.designer').hide();
            });

            // Get style
            $.ajax('/css/embedInlineEditor.css').success(function(style){
                $('#embed-inline-editor-style').text(style);
            });
        }
    });
});
